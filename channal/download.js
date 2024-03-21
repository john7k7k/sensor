// 通道: download
window.electronApi.send('download', JSON.stringify({
    selects: ["1", "3"]
}));