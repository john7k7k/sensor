// 通道: download
window.electronApi.send('scan', JSON.stringify({
    selects: ["1", "2", "4"]
}));

window.electronApi.on('scan', (e, data) => { //data為回傳資料
    //回傳格式
    let ret = {
        descriptionMap: {
          '1': '39-78',
          '2': '39-79',
          '3': '',
          '4': '',
          '5': '',
          '6': '',
          '7': '',
          '8': '',
          '9': '',
          '10': '',
          '11': '',
          '12': '',
          '13': '',
          '14': '',
          '15': '',
          '16': ''
        }
      }
})
