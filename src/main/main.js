const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { readStorage, writeStorage } = require('./storage');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile('public/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    const storage = readStorage();
    if (storage.lastFolderPath) {
        mainWindow.webContents.once('did-finish-load', () => {
            mainWindow.webContents.send('load-last-folder', storage.lastFolderPath);
        });
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
    });

    if (result.canceled) {
        return null;
    } else {
        const folderPath = result.filePaths[0];
        const folderContent = fs.readdirSync(folderPath, { withFileTypes: true })
            .map(dirent => ({
                name: dirent.name,
                isDirectory: dirent.isDirectory(),
                path: path.join(folderPath, dirent.name)
            }));

        const storage = readStorage();
        storage.lastFolderPath = folderPath;
        writeStorage(storage);

        return { folderPath, folderContent };
    }
});

ipcMain.handle('set-server-url', async (event, url) => {
    const storage = readStorage();
    storage.serverURL = url;
    writeStorage(storage);
});

ipcMain.handle('get-storage', async () => {
    return readStorage();
});
