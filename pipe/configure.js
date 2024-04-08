const { SerialPort } = require('serialport');
const decMapf = require('./tool/decMap.js');
const { callExe } =  require('./tool/exe.js');
const test = require('./test');
const { chooseSensor }  = require('./tool/port.js')

function convertExeArg(ConfigurepassData, description){
    //configuration.exe def 0 60 6 "def F F F F F F" 0 0 U 0 00h00m06s 2 00h00m 0 00h01m "2000/2/2 上 2h3m23s" 1 10 0 00h02m "2045/3/4 上 2h3m23s" T F
    let alerm = '';
    if(ConfigurepassData.alerm === ""){
        alerm = 'def'
    }
    else {
        for (let i of ConfigurepassData.alerm.slice(0,7)){
            if(i){
                alerm = alerm + 'T_';
            }
            else{
                alerm = alerm + 'F_';
            }
        }
        alerm = alerm.slice(0, 13);
    }
    let resData = `def ${ConfigurepassData.minimum} ${ConfigurepassData.maximum} ${ConfigurepassData.increment} ${alerm} ${ConfigurepassData.alerm[5]} ${ConfigurepassData.alerm[6]} ${ConfigurepassData.duration} ${ConfigurepassData.intervalread} ${ConfigurepassData.localstartTrip.split(' ')[0]} ${ConfigurepassData.localstartTrip.split(' ')[1]} ${ConfigurepassData.localstartTrip.split(' ')[0]} ${ConfigurepassData.localstartTrip.split(' ')[1]} ${ConfigurepassData.beeper?'T':'F'} ${ConfigurepassData.newbattery?'T':'F'} ${description}`;
    return resData.split(' ');
}

module.exports = ( ipcMain ) => {
    ipcMain.on('configure', async (e, mes) => {
        mes = JSON.parse(mes);
        let resData = {};
        console.log(mes);
        let decMap = await decMapf.getDecMap();
        let { ConfigurepassData } = mes;
        let { pin } = ConfigurepassData;
        let description = decMap[pin];
        let select = pin;
        if(!select){
            resData = {
                description,
                state: "Map not find select" //"Configure Fail, call exe error" or "MCU not ack" or "Map not find select"
            }
            console.log(resData)
            return e.sender.send('configure', JSON.stringify(resData));
        }
        // let MCUack = await chooseSensor(select);
        // if(!MCUack){
        //     resData = {
        //         description,
        //         state: "MCU not ack" //"configure Fail, call exe error" or "MCU not ack" or "Map not find select"
        //     }
        //     console.log(resData)
        //     return e.sender.send('configure', JSON.stringify(resData));
        // }
        let exeArg = convertExeArg(ConfigurepassData, description)
        let exeData = await callExe('configuration.exe ' , exeArg);
        //console.log(exeData.split("\n")[0])
        if(exeData.split("\n")[0] === "Can't find Program and Configure window"){
            resData = {
                description,
                state: "configure Fail, call exe error" //"configure Fail, call exe error" or "MCU not ack" or "Map not find select"
            }
            console.log(resData)
            return e.sender.send('configure', JSON.stringify(resData));
        }
        resData = {
            description,
            state: "OK" 
        }
        console.log(resData)
        e.sender.send('scan', JSON.stringify(resData));
    });
}
