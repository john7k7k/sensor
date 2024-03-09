const { app, BrowserWindow } = require('electron');
const { SerialPort } = require('serialport');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('index.html');
  const port = new SerialPort({ path: 'COM3', baudRate: 9600 });
  port.write('Hello MCU');

  win.on('closed', () => {
    port.close();
  });
}

app.whenReady().then(createWindow);