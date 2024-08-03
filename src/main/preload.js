const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    setServerURL: (url) => ipcRenderer.invoke('set-server-url', url),
    getStorage: () => ipcRenderer.invoke('get-storage'),
    onLoadLastFolder: (callback) => ipcRenderer.on('load-last-folder', (event, folderPath) => callback(folderPath)),
});
