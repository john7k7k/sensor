const fs = require('fs');
const { spawn } = require('child_process');
const { SerialPort } = require('serialport');
const path = require('path');
const test = require('./test');
function convertCSV(rawData){
    const lines = rawData.split('\n');
    const header = [lines[0],lines[1],lines[2]].join('\n')
    const name = lines[4].replace('Air Temp ( XC)', 'Temp').replace('Humidity (%RH)', 'Humidity').replace('Elapsed  Time', 'Elapsed_Time').replace(/\s+/g, ',');
    const data = lines.slice(5).map(line => line.replace(/\s+/g, ','));
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
        file[0] = data[0];
        let lastIndex = file.at(-1).split(',')[0];
        data.slice(4).forEach((row, index) => {
            data[index+4] = ++lastIndex + data[index+4].slice(1);
        });
        file.push(...(data.slice(4)))
        saveCSV(path ,file.join('\n'));
    })
    
}

function callExe(call = true){
    if(!call) return 'test';
    return new Promise((resolve, reject) => {
        const { spawn } = require('child_process');
        let exePath = 'loading_scg/loading.exe';
        const childProcess = spawn(exePath);
        childProcess.stdout.on('data', (data) => {
            console.log(`out: ${data}`);
            resolve(String(data));
        });
        childProcess.stderr.on('data', (data) => {
            console.error(`err: ${data}`);
            reject(`err: ${data}`)
        });
        childProcess.on('close', (code) => {
            console.log(`error ${code}`);
            reject(`error ${code}`);
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

function getHeader(data){
}


module.exports = ( ipcMain ) => {
    ipcMain.on('download', async (e, mes) => {
        JSON.parse(mes);
        const MCUack = await chooseSensor(mes.description);
        if(!MCUack) return e.sender.send('download', 'MCU not ack');
        let exeData = await callExe(false);
        if(exeData === 'test') exeData = require('./test.js')[1];
        if(!exeData) return e.sender.send('download', 'Script not return data');
        fs.readdir('datas', (err, fileNames) => {
            let description = mes.description;
            if(!description) description = 'data';
            if(fileNames.find(fileName => fileName === description + '.csv')){
                updateCSV(path.join('datas/', description + '.csv'), exeData );
            }
            else{
                saveCSV(`datas/${description}.csv`, exeData);
            }
        })
        e.sender.send('data', {});
    });
}


