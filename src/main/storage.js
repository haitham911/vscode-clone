const fs = require('fs');
const path = require('path');
const { app } = require('electron'); // Ensure the app is imported correctly

const STORAGE_PATH = path.join(app.getPath('userData'), 'storage.json');

function readStorage() {
    if (fs.existsSync(STORAGE_PATH)) {
        const data = fs.readFileSync(STORAGE_PATH);
        return JSON.parse(data);
    }
    return {};
}

function writeStorage(data) {
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(data));
}

module.exports = { readStorage, writeStorage };
