// 通道: download
window.electronApi.send('download', JSON.stringify({
    selects: ["1", "3"]
}));

window.electronApi.on('init', (e, data) => { //data為回傳資料
    //回傳格式
    let ret = {
        "1": { description: '39-24', state: 'download succfully' },
        "3": { description: '', state: 'failed' }
    }
})
