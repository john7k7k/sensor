const init = require("./init");
const search = require('./search');
const download = require('./download');
const getMap = require('./getMap');
const scan = require('./scan');

module.exports = (ipcMain) => {
    init(ipcMain);
    search(ipcMain);
    download(ipcMain);
    getMap(ipcMain);
    scan(ipcMain);
}