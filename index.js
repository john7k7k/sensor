const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const { SerialPort } = require('serialport');
const pipe = require('./pipe')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.loadFile(path.join(__dirname, 'public', 'index.html'));
  // const port = new SerialPort({ path: 'COM11', baudRate: 9600 });
  // port.write('87\n');
  // port.on('data', (data) => {
  //   console.log('ack ' + data);
  // })
  // win.on('closed', () => {
  //   port.close();
  // });
}
pipe(ipcMain);
app.on('ready', createWindow);