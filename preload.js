const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronApi', {
    send(channel, mes){
        ipcRenderer.send(channel, mes);
    },
    on(channel, task){
        ipcRenderer.on(channel, task);
    }
});