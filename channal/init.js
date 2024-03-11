// 通道: init
window.electronApi.send('init', JSON.stringify({}));

//回傳通道
window.electronApi.on('init', (e, data) => { //data為回傳資料
    //回傳格式
    [
        {
            ID: 'X1',
            totalTime: '00:30:00',
            data: [
                {
                    temperature: 30,
                    humidity: 60,
                    air: 'U',
                    time: '2024/3/4 20:00:06'
                },
                {
                    temperature: 30.1,
                    humidity: 64,
                    air: 'U',
                    time: '2024/3/4 20:00:12'
                },
                {
                    temperature: 30.4,
                    humidity: 64.4,
                    air: 'U',
                    time: '2024/3/4 20:00:18'
                },
                {
                    temperature: 30.1,
                    humidity: 62,
                    air: 'U',
                    time: '2024/3/4 20:00:24'
                },
                {
                    temperature: 31.1,
                    humidity: 67,
                    air: 'U',
                    time: '2024/3/4 20:00:30'
                }
            ]
        },
        {
            ID: 'X2',
            totalTime: '00:30:00',
            data: [
                {
                    temperature: 30,
                    humidity: 60,
                    air: 'U',
                    time: '2024/3/4 20:00:06'
                },
                {
                    temperature: 30.1,
                    humidity: 64,
                    air: 'U',
                    time: '2024/3/4 20:00:12'
                },
                {
                    temperature: 30.4,
                    humidity: 64.4,
                    air: 'U',
                    time: '2024/3/4 20:00:18'
                },
                {
                    temperature: 30.1,
                    humidity: 62,
                    air: 'U',
                    time: '2024/3/4 20:00:24'
                },
                {
                    temperature: 31.1,
                    humidity: 67,
                    air: 'U',
                    time: '2024/3/4 20:00:30'
                }
            ]
        },
    ]
})
