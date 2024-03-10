const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const { SerialPort } = require('serialport');

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
  const port = new SerialPort({ path: 'COM3', baudRate: 9600 });
  port.write('Hello MCU\n');

  win.on('closed', () => {
    port.close();
  });
}

ipcMain.on('data', (e, mes) => {
  console.log(mes);
  e.sender.send('data', 'Hello from main process!');
});

app.on('ready', createWindow);