const fs = require('fs');
const { spawn } = require('child_process');

function covertCSV(datas){
    const rawData = `Battery Status: 99.6 %
Description: 39-78
Product Code: EI-HS-D-32-L

Index      Elapsed  Time   Date    Time    Air Temp ( XC)    Humidity (%RH)
1        00:00:00       2024/3/15        U   08:55:00   23.5      74.3
2        00:00:06       2024/3/15        U   08:55:06   23.5      74.2
3        00:00:12       2024/3/15        U   08:55:12   23.6      74.1
4        00:00:18       2024/3/15        U   08:55:18   23.7      74.0
5        00:00:24       2024/3/15        U   08:55:24   23.7      74.2
6        00:00:30       2024/3/15        U   08:55:30   23.6      74.6`;

    const lines = rawData.split('\n');
    const header = [lines[0],lines[1],lines[2]]
    const name = lines[4].replace('Air Temp ( XC)', 'Temp').replace('Humidity (%RH)', 'Humidity').replace('Elapsed  Time', 'Elapsed_Time').replace(/\s+/g, ',');
    const data = lines.slice(5).map(line => line.replace(/\s+/g, ','));
    const csvData = [...header, name, ...data].join('\n');
    fs.writeFile('datas/data.csv', csvData, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('CSV 文件已保存');
    });
}
function getHeader(data){
    return {
        Battery_Status: data.substr(16, 4),
        Description: data.substr(35, 5),
        Product_Code: data.substr(54, 12)
    }
}


module.exports = ( ipcMain ) => {
    ipcMain.on('download', (e, mes) => {
        covertCSV();
        e.sender.send('data', {});
    });
}


