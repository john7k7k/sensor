const fs = require('fs');
const { SerialPort } = require('serialport');
const path = require('path');
const test = require('./test');
const decMapf = require('./tool/decMap.js');
const { callExe } =  require('./tool/exe.js');
//let port = new SerialPort({ path: "COM14", baudRate: 9600 })

const { chooseSensor } = require('./tool/port.js');

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

// function chooseSensor(description){
//     return new Promise((resolve, reject) => {
//         try{
//             // port = new SerialPort({ path: 'COM14', baudRate: 9600 },(err) => {
//             //     resolve(err);
//             // });
//             port.write(`${description}\n`);
//             port.on('data', (data) => {
//                 console.log('ack: ' + data);
//                 resolve(data);
//             })
//         }catch(err){reject(err);}
//     })
// }

module.exports = ( ipcMain ) => {
    ipcMain.on('download', async (e, mes) => {
        mes = JSON.parse(mes);
        let resData = {};
        let decMap = await decMapf.getDecMap();
        for(let selectInd in mes.selects){
            let select = mes.selects[selectInd];
            resData[select] = {};
            const MCUack = await chooseSensor(select);
            if(!MCUack){
               resData[select].state = 'MCU  not ack';
               resData[select].description = decMap[select];
               continue;
            } ;
            
            let exeData = await callExe('loading.exe');
            if(exeData.split)
            console.log(exeData.split('\n').length);
            if(exeData === 'test') exeData = require('./test.js')[1];
            else if(exeData.split('\n').length < 4) {
                resData[select].state = 'call exe error, please check connect';
                resData[select].description = decMap[select];
                continue;
            };
            console.log(exeData)
            let description = exeData.split('\n')[2].split(':')[1].slice(1, 6);
            if(mes.mode === "check"){
                if((await decMapf.getDecMap())[select] !== description){
                    resData[select].state = 'description is not original, the new one is ' + description;
                    resData[select].description = decMap[select];
                    continue;
                }
            }
            decMapf.updateDecMap(select, description);
            resData[select].description = description;
            resData[select].state = 'OK';
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
        resData.descriptionMap = await decMapf.getDecMap();
        console.log(resData)
        e.sender.send('download', JSON.stringify(resData));
    });
}


