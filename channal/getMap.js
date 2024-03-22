// 通道: download
window.electronApi.send('getMap', JSON.stringify({}));

window.electronApi.on('getMap', (e, data) => { //data為回傳資料
    //回傳格式
    let ret = {"1":"39-24","2":"39-79","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":"","16":""}

})
