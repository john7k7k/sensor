const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { app } = require('electron');
module.exports = ( ipcMain ) => {
    ipcMain.on('init',(e, mes) => {
        let resData = {};
        //console.log(path.join(app.getPath('userData'),'datas'));
        fs.readdir(path.join(app.getPath('userData'),'SGS/datas'), async (err, files) => {
            await Promise.all(files.map(fileName => new Promise((resolve, reject) => {
                fs.readFile((path.join(app.getPath('userData'),'SGS/datas', fileName)), (err, file) => {
                    resData[fileName.slice(0, 5)] = (String(file).split('\n').slice(-5));
                    resolve(0);
                })
            })))
            console.log(convertSender(resData));
            e.sender.send('init', JSON.stringify(convertSender(resData)));
        })
    });
}

function convertSender(data){
    let resData = [];
    for(des in data){
        resData.push({
            ID: des,
            totalTime: data[des].at(-1).split(',')[1],
            data: data[des].map(row => ({
                temperature: Number(row.split(',')[5]),
                humidity: Number(row.split(',')[6]),
                air: row.split(',')[3],
                time: row.split(',')[2] + ' ' + row.split(',')[4]
            }))
        })
    }
    return resData;
}
