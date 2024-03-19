const init = require("./init");
const data = require('./data');
const download = require('./download');

module.exports = (ipcMain) => {
    init(ipcMain);
    data(ipcMain);
    download(ipcMain);
}