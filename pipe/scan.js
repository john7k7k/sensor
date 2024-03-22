const { SerialPort } = require('serialport');
const decMapf = require('./tool/decMap.js');
const { callExe } =  require('./tool/exe.js');
const test = require('./test');

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
    ipcMain.on('scan', async (e, mes) => {
        mes = JSON.parse(mes);
        let resData = {};
        for(let selectInd in mes.selects){
            let select = mes.selects[selectInd];
            // const MCUack = await chooseSensor(select);
            // if(!MCUack){
            //    resData[select].state = 'MCU  not ack';
            //    continue;
            // } ;
            let exeData = await callExe('get_property.exe');
            if(exeData === 'test') exeData = require('./test.js')[1];
            if(!exeData) {
                resData[select].state = 'can not call exe'
            };
            console.log(exeData)
            let description = exeData.split('\n')[2].split(':')[1].slice(1, 6);
            decMapf.updateDecMap(select, description);
        }
        resData.descriptionMap = await decMapf.getDecMap();
        console.log(resData)
        e.sender.send('scan', JSON.stringify(resData));
    });
}
