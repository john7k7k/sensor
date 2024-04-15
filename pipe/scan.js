const { SerialPort } = require('serialport');
const decMapf = require('./tool/decMap.js');
const { callExe } =  require('./tool/exe.js');
const test = require('./test');
//let port = new SerialPort({ path: "COM14", baudRate: 9600 })

const { chooseSensor }  = require('./tool/port.js')

// function chooseSensor(description){
//     return new Promise((resolve, reject) => {
//         try{
//             const port = new SerialPort({ path: 'COM14', baudRate: 9600 },(err) => {
//                 resolve(err);
//             });
//             port.write(`${description}\n`);
//             port.on('data', (data) => {
//                 console.log('ack: ' + data);
//                 resolve(data);
//             })
//         }catch(err){reject(err);}
//     })
// }

module.exports = ( ipcMain ) => {
    ipcMain.on('scan', async (e, mes) => {
        mes = JSON.parse(mes);
        let resData = {};
        let decMap = await decMapf.getDecMap();
        for(let selectInd in mes.selects){
            let select = mes.selects[selectInd];
            resData[select] = {};
            // const MCUack = await chooseSensor(select);
            // if(!MCUack){
            //    resData[select].state = 'MCU  not ack';
            //    continue;
            // } ;
            let exeData = await callExe('get_property.exe');
            if(exeData === 'test') exeData = require('./test.js')[1];
            else if(exeData.split('\n').length < 4) {
                resData[select].state = 'call exe error, please check connect';
                resData[select].description = decMap[select];
                continue;
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
