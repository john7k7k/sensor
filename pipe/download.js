const fs = require('fs');
const { spawn } = require('child_process');
const { SerialPort } = require('serialport');
const path = require('path');
const test = require('./test');
const decMapf = require('./tool/decMap.js');

let exeOut = 0;
function convertCSV(rawData){
    const lines = rawData.split('\n');
    const header = [lines[0],lines[1],lines[2], lines[3]].join('\n')
    const name = lines[5].replace('Air Temp ( XC)', 'Temp').replace('Humidity (%RH)', 'Humidity').replace('Elapsed  Time', 'Elapsed_Time').replace(/\s+/g, ',');
    const data = lines.slice(6).map(line => line.replace(/\s+/g, ','));
    data.pop();
    data.pop();
    const csvData = [name, ...data].join('\n');
    return [ header, csvData ];
}

function saveCSV(path, data){
    data = convertCSV(data).join('\n');
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('CSV saved');
    });
}

function updateCSV(path, data){
    data = convertCSV(data).join('\n').split('\n');
    fs.readFile(path, (err, file)=>{
        file = String(file).split('\n');
        file[1] = data[1];
        let lastIndex = file.at(-1).split(',')[0];
        data.slice(5).forEach((row, index) => {
            data[index+5] = ++lastIndex + data[index+5].slice(1);
        });
        file.push(...(data.slice(5)))
        saveCSV(path ,file.join('\n'));
    })
    
}

function callExe(exePath ,call = true){
    if(!call) return 'test';
    return new Promise((resolve, reject) => {
        const { spawn } = require('child_process');
        const childProcess = spawn(exePath);
        childProcess.stdout.on('data', (data) => {
            console.log(`out: ${data}`);
            if(!exeOut){
                exeOut = String(data);
            }
            else exeOut += '\n' + String(data);
        });
        childProcess.stderr.on('data', (data) => {
            console.error(`err: ${data}`);
            reject(`err: ${data}`)
        });
        childProcess.on('close', (code) => {
            console.log(`error ${code}`);
            resolve(exeOut);
            exeOut = 0;
        });
    })
}

function chooseSensor(description){
    return new Promise((resolve, reject) => {
        try{
            const port = new SerialPort({ path: 'COM11', baudRate: 9600 },(err) => {
                resolve(err);
            });
            port.write(`${description}\n`);
            port.on('data', (data) => {
                console.log('ack: ' + data);
                resolve(data);
            })
        }catch(err){reject(err);}
    })
}




module.exports = ( ipcMain ) => {
    ipcMain.on('download', async (e, mes) => {
        mes = JSON.parse(mes);
        let resData = {};
        for(let selectInd in mes.selects){
            let select = mes.selects[selectInd];
            // const MCUack = await chooseSensor(select);
            // if(!MCUack){
            //    resData[select].state = 'MCU  not ack';
            //    continue;
            // } ;
            resData[select] = {};
            let exeData = await callExe('loading_scg/loading.exe');
            if(exeData === 'test') exeData = require('./test.js')[1];
            if(!exeData) {
                resData[select].state = 'can not call exe'
            };
            console.log(exeData)
            let description = exeData.split('\n')[2].split(':')[1].slice(1, 6);
            decMapf.updateDecMap(select, description);
            resData[select].description = description;
            fs.readdir('datas', (err, fileNames) => {  
                if(!description) description = 'data';
                if(fileNames.find(fileName => fileName === description + '.csv')){
                    updateCSV(path.join('datas/', description + '.csv'), exeData );
                }
                else{
                    saveCSV(`datas/${description}.csv`, exeData);
                }
            })
        }
        console.log(resData)
        e.sender.send('data', JSON.stringify(resData));
    });
}


