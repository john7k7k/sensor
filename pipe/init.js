const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
module.exports = ( ipcMain ) => {
    ipcMain.on('init',(e, mes) => {
        console.log(mes);
        let resData = {};
        fs.readdir('datas', async (err, files) => {
            await Promise.all(files.map(fileName => new Promise((resolve, reject) => {
                fs.readFile(path.join('datas', fileName), (err, file) => {
                    resData[fileName.slice(0, 5)] = (String(file).split('\n').slice(-5));
                    resolve(0);
                })
            })))
            console.log(convertSender(resData)[0].data);
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
