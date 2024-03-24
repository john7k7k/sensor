//通道 search
window.electronApi.send('search', JSON.stringify([
    {   //開始到結束時間的所有資料，包含頭尾
        ID: 'X1',
        startTime: '2024/3/11 23:59:54',
        endTime: '2024/3/12 00:00:06'
    },
    {   //從開始時間查詢後4筆資料，包含開頭
        ID: 'X2',
        startTime: '2024/3/4 23:20:47',
        quantity: 4
    },
    {   //從結束時間查詢前4筆資料，包含結尾
        ID: 'X3',
        endTime: '2024/3/12 23:20:48',
        quantity: 2
    },
,]));

window.electronApi.on('search', (e, data) => { //data為回傳資料
    //回傳格式
    [
        {
            ID: 'X1',
            data: [
                {
                    temperature: 30,
                    humidity: 60,
                    air: 'U',
                    time: '2024/3/11 23:59:54'
                },
                {
                    temperature: 30.1,
                    humidity: 64,
                    air: 'U',
                    time: '2024/3/12 00:00:00'
                },
                {
                    temperature: 30.4,
                    humidity: 64.4,
                    air: 'U',
                    time: '2024/3/12 00:00:06'
                }
            ]
        },
        {
            ID: 'X2',
            data: [
                {
                    temperature: 30,
                    humidity: 60,
                    air: 'U',
                    time: '2024/3/4 23:20:48'
                },
                {
                    temperature: 30.1,
                    humidity: 64,
                    air: 'U',
                    time: '2024/3/4 23:21:00'
                },
                {
                    temperature: 31.1,
                    humidity: 64,
                    air: 'U',
                    time: '2024/3/4 23:21:06'
                },
                {
                    temperature: 30.1,
                    humidity: 66,
                    air: 'U',
                    time: '2024/3/4 23:21:12'
                }
            ]
        },
        {
            ID: 'X3',
            data: [
                {
                    temperature: 30,
                    humidity: 60,
                    air: 'U',
                    time: '2024/3/12 23:20:42'
                },
                {
                    temperature: 30.1,
                    humidity: 64,
                    air: 'U',
                    time: '2024/3/12 23:20:48'
                }
            ]
        }
    ]
})