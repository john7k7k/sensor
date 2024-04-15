const fs = require('fs');
const { SerialPort } = require('serialport');
const path = require('path');
const test = require('./test');
const decMapf = require('./tool/decMap.js');
const { callExe } =  require('./tool/exe.js');
const { app } = require('electron');
//let port = new SerialPort({ path: "COM14", baudRate: 9600 })

const { chooseSensor } = require('./tool/port.js');

function convertCSV(rawData){
    try{
        const lines = rawData.split('\n');
        const header = [lines[0],lines[1],lines[2], lines[3]].join('\n')
        const name = lines[5].replace('Air Temp ( XC)', 'Temp').replace('Humidity (%RH)', 'Humidity').replace('Elapsed  Time', 'Elapsed_Time').replace(/\s+/g, ',');
        const data = lines.slice(6).map(line => line.replace(/\s+/g, ','));
        data.pop();
        data.pop();
        for(let ind in data){
            let line = data[ind];
            console.log(line.split(','))
            if((line.split(',')[3] === 'U'&& line.split(',')[4].split(':')[0] !== '12')){
                let element = line.split(',');
                let time = line.split(',')[4].split(':');
                element[4] = `${Number(time[0]) + 12}:${time[1]}:${time[2]}`
                data[ind] = element.join(',')
            }
            else if(line.split(',')[4].split(':')[0] === '12' && line.split(',')[3] !== 'U'){
                let element = line.split(',');
                let time = line.split(',')[4].split(':');
                element[4] = `${Number(time[0]) - 12}:${time[1]}:${time[2]}`
                data[ind] = element.join(',')
            }
        }
        const csvData = [name, ...data].join('\n');
        return [ header, csvData ];
    }catch(e){console.log(e)}
}

function saveCSV(path, data, convert = true){
    data = (convert?convertCSV(data).join('\n'):data);
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('CSV saved');
    });
}

function updateCSV(path, data, convert = true){
    data = (convert?convertCSV(data).join('\n'):data).split('\n');
    fs.readFile(path, (err, file)=>{
        file = String(file).split('\n');
        file[1] = data[1];
        let lastIndex = file.at(-1).split(',')[0];
        let startIndex = data.slice(5).findIndex(row =>{ 
            return new Date(row.split(',')[2] + ' ' + row.split(',')[4]) >
            new Date(file.at(-1).split(',')[2] + ' ' + file.at(-1).split(',')[4])
        })+5;
        if(startIndex < 5) return;
        data.slice(startIndex).forEach((row, index) => {
            data[index+startIndex] = ++lastIndex + data[index+startIndex].slice(Math.ceil(Math.log10(index + 2)));
        })
        file.push(...(data.slice(startIndex)))
        saveCSV(path ,file.join('\n'), false);
    })
}
// let exeData = `Serial Number: 1642-0005
// Battery Status: 97.0 %
// Description: 39-78
// Product Code: EI-HS-D-32-L
// Index,Elapsed_Time,Date,Time,Temp,Humidity,
// 1,00:00:00,2024/2/28,U,09:07:00,23.7,74.2,
// 2,00:00:06,2024/4/28,U,09:07:06,23.6,73.5,
// 3,00:00:12,2024/4/28,U,09:07:12,23.6,73.7,
// 4,00:00:18,2024/4/28,U,09:07:18,23.6,73.5,
// 5,00:00:24,2024/4/28,U,09:07:24,23.6,73.5,`
// let description = '39-78'
// updateCSV(path.join('../datas/', description + '.csv'), exeData,false );

module.exports = ( ipcMain ) => {
    ipcMain.on('download', async (e, mes) => {
        mes = JSON.parse(mes);
        let resData = {};
        let decMap = await decMapf.getDecMap();
        for(let selectInd in mes.selects){
            let select = mes.selects[selectInd];
            resData[select] = {};
            // const MCUack = await chooseSensor(select);
            // if(!MCUack){
            //    resData[select].state = 'MCU  not ack';
            //    resData[select].description = decMap[select];
            //    continue;
            // } ;
            
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
            fs.readdir(path.join(app.getPath('userData'),'SGS/datas'), (err, fileNames) => {  
                if(!description) description = 'data';
                if(fileNames.find(fileName => fileName === description + '.csv')){
                    updateCSV(path.join(app.getPath('userData'),'SGS/datas', description + '.csv'), exeData );
                }
                else{
                    saveCSV(path.join( app.getPath('userData'),'SGS/datas', description + '.csv'), exeData);
                }
            })
        }
        resData.descriptionMap = await decMapf.getDecMap();
        console.log(resData)
        e.sender.send('download', JSON.stringify(resData));
    });
}


