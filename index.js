const fs = require('fs');
const {app, BrowserWindow, ipcMain, screen} = require('electron');
const path = require('path');
const userDataPath = app.getPath('userData');
const customFolder = path.join(userDataPath, 'SGS');
if (!fs.existsSync(customFolder)) {
  fs.mkdirSync(customFolder, { recursive: true });
  fs.mkdirSync(path.join(customFolder,'datas'), { recursive: true });
  fs.mkdirSync(path.join(customFolder,'config'), { recursive: true });
  fs.writeFileSync(path.join(customFolder,'config','decMap.json'), '{"0":"","1":"","2":"","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""}', (err) => {
    if (err) {
        console.error(err);
        return;
    }
  });
  fs.writeFileSync(path.join(customFolder,'key.txt'), '', (err) => {
    if (err) {
        console.error(err);
        return;
    }
  });
  console.log('Custom folder created successfully');
}

const pipe = require('./pipe')



function createWindow() {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.maximize()
  win.loadFile(path.join(__dirname, 'public', 'index.html'));
  
}
pipe(ipcMain);

app.on('ready', () => {
  
  createWindow();
});