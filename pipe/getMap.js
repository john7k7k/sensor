const { getDecMap } = require('./tool/decMap.js');

module.exports = ( ipcMain ) => {
    ipcMain.on('getMap', async (e, mes) => {
        console.log(JSON.stringify(await getDecMap()))
        e.sender.send('getMap', JSON.stringify(await getDecMap()));
    });
}