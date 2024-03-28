const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, '../datas');

module.exports = ( ipcMain ) => {
    ipcMain.on('search', (e, mes) => {
        try {
            mes = JSON.parse(mes);
            resData = [];

            for (let i = 0; i < mes.length; i++) {
                if (mes[i].startTime !== undefined) {
                    console.log(mes[i].startTime);
                    if (mes[i].endTime !== undefined) {
                        data1 = readData(path.join(folderPath, mes[0].ID + '.csv'));
                        resData.push({
                            ID: mes[0].ID,
                            data: formatData(
                                data1.slice(
                                    findClosestTime(data1, mes[0].startTime),
                                    findClosestTime(data1, mes[0].endTime) + 1
                                )
                            )
                        });
                    } else {
                        data2 = readData(path.join(folderPath, mes[1].ID + '.csv'));
                        indexOfStartTime = findClosestTime(data2, mes[1].startTime);
                        resData.push({
                            ID: mes[1].ID,
                            data: formatData(
                                data2.slice(
                                    indexOfStartTime,
                                    indexOfStartTime + mes[1].quantity
                                )   
                            )
                        });
                    }
                } else {
                    data3 = readData(path.join(folderPath, mes[2].ID + '.csv'));
                    indexOfEndTime = findClosestTime(data3, mes[2].endTime) - 1;
                    resData.push({
                        ID: mes[2].ID,
                        data: formatData(
                            data3.slice(
                                indexOfEndTime - mes[2].quantity,
                                indexOfEndTime
                            )
                        )
                    });
                }
            }
            e.sender.send('search', JSON.stringify(resData));
        } catch (err) {
            console.error("Error in search:", err);
            e.sender.send('search', JSON.stringify([]));
        }
    });
}

function readData(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.split('\n').map(row => row.slice(0, -1).split(',')).slice(4);
    } catch (err) {
        console.error("Error reading the file:", err);
        return null;
    }
}

function findClosestTime(data, targetTime) {
    var newData = data.map(function(entry) {
        var date = entry[2];
        var time = entry[4];
        entry.push(new Date(date + " " + time));
        return entry;
    });
    
    var inputDateTime = new Date(targetTime);
    console.log(inputDateTime);

    var closestEntry = newData.reduce(function(prev, curr) {
        return (Math.abs(curr[7] - inputDateTime) < Math.abs(prev[7] - inputDateTime) ? curr : prev);
    });
    
    console.log(closestEntry);
    console.log(data.indexOf(closestEntry))

    return data.indexOf(closestEntry);
}

function formatData(data) {
    var formattedData = data.map(entry => {
        return {
            temperature: parseFloat(entry[5]),
            humidity: parseFloat(entry[6]),
            air: entry[3],
            time: entry[2] + ' ' + entry[4]
        };
    });
    return formattedData;
}