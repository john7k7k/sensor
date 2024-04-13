// 通道: download
window.electronApi.send('configure', JSON.stringify({
    mode: "check", //"anyway"
    ConfigurepassData:{
        pin: "", //1
        beeper: true, //14
        newbattery: true, //15
        minimum: "12", //2
        maximum: "40.5", //3
        increment: "1.5", //4
        duration: "1", //8
        intervalread: "1days2h3m4s", //9
        starttrip: "1 4h5m || 2 4days3h5m || 3 2014/06/01 上 8:00", //10 11
        finishtrip: "1 5 || 2 4days3h5m || 3 2014/06/01 上 8:00", //12 13
        alerm: [true, true, false, true, true, 0, 0,false] //5 6 7
    }
}));

window.electronApi.on('configure', (e, data) => { //data為回傳資料
    //回傳格式
    let ret = {
        description: "",
        state: "OK" //"configure Fail, call exe error" or "MCU not ack" or "Map not find select"
    }
})
