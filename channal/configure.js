// 通道: download
window.electronApi.send('configure', JSON.stringify({
    mode: "check", //"anyway"
    ConfigurepassData:{
        pin: "",
        beeper: true,
        newbattery: true,
        minimum: "",
        maximum: "",
        increment: "",
        duration: "1",
        intervalread: "1days2h3m4s",
        starttrip: "1 4h5m || 2 4days3h5m || 3 2014/06/01 上 8:00",
        finishtrip: "1 5readings || 2 ",
        alerm: [true, true, false, false, true, true, 0, 0,false]
    }
}));

window.electronApi.on('configure', (e, data) => { //data為回傳資料
    //回傳格式
    let ret = {
        description: "",
        state: "OK" //"configure Fail, call exe error" or "MCU not ack" or "Map not find select"
    }
})
