const path = require('path');
const { spawn } = require('child_process');
function callExe(exeName ,call = true){
    if(!call) return 'test';
    let exeOut = 0;
    return new Promise((resolve, reject) => {
        let exePath = path.join(__dirname,'../../loading_scg', exeName);
        const childProcess = spawn(exePath);
        childProcess.stdout.on('data', (data) => {
            console.log(`out: ${data}`);
            if(!exeOut){
                exeOut = String(data);
            }
            else exeOut += '\n' + String(data);
        });
        childProcess.stderr.on('data', (data) => {
            console.error(`err: ${data}`);
            reject(`err: ${data}`)
        });
        childProcess.on('close', (code) => {
            console.log(`error ${code}`);
            resolve(exeOut);
            exeOut = 0;
        });
    })
}

module.exports = { callExe };