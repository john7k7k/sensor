// 通道: download
window.electronApi.send('download', JSON.stringify({
    selects: ["1", "3"]
}));

window.electronApi.on('download', (e, data) => { //data為回傳資料
    //回傳格式
    let ret = {
        "1": { description: '39-24', state: 'download succfully' },
        "3": { description: '', state: 'failed' },
        "descriptionMap":{"1":"39-24","2":"39-79","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":"","16":""}
    }
})
