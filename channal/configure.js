// 通道: download
window.electronApi.send('configure', JSON.stringify({
    mode: "check", //"anyway"
    ConfigurepassData:{
        description: "", 
        beeper: true, //
        newbattery: true,
        minimum: "", //2
        maximum: "", //3
        increment: "", //4
        duration: "1", //8
        intervalread: "1days2h3m4s", //9
        starttrip: "wait1h2m",
        finishtrip: "after1h",
        alerm: [true, true, false, false, true,  0, 0, true] //5
    }
}));

window.electronApi.on('configure', (e, data) => { //data為回傳資料
    //回傳格式
    let ret = {
        description: "",
        state: "OK" //"configure Fail, call exe error" or "MCU not ack" or "Map not find select"
    }
})
