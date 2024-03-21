const init = require("./init");
const search = require('./search');
const download = require('./download');

module.exports = (ipcMain) => {
    init(ipcMain);
    search(ipcMain);
    download(ipcMain);
}