const { app, BrowserWindow } = require('electron');
const { SerialPort } = require('serialport');
const { ipcMain } = require('electron');

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

// 监听来自 Vue 组件的数据请求
ipcMain.on('sendData', (event, data) => {
  console.log('Received data from Vue component:', data);
  
  // 在这里处理数据，您可以执行任何您需要的逻辑

  // 发送响应数据到 Vue 组件
  event.reply('responseData', 'Data received successfully!');
});