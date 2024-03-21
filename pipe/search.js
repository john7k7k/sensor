const { spawn } = require('child_process');

module.exports = ( ipcMain ) => {
    ipcMain.on('data', (e, mes) => {
        console.log(mes);
        let exePath = 'd:\\ntut\\power\\elec\\a.exe';
        exePath = 'loading_scg/loading.exe';

        const childProcess = spawn(exePath);
        childProcess.stdout.on('data', (data) => {
        console.log(`out: ${data}`);
        });
        childProcess.stderr.on('data', (data) => {
        console.error(`err: ${data}`);
        });
        childProcess.on('close', (code) => {
        console.log(`error ${code}`);
        });
        e.sender.send('data', {});
    });
}