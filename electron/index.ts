import { app, BrowserWindow, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import fs from 'fs';
import path from 'path';
import url from 'url';
import initializeDatabase from './initializeDatabase';
import registerIpcListeners from './registerIpcListeners';

const appDir = path.dirname(app.getAppPath());

let mainWindow: BrowserWindow;
const run = async () => {
  try {
    await app.whenReady();
    mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
    });

    ipcMain.on('get_version_string', (event) => {
      event.sender.send('get_version_string', app.getVersion());
    });

    registerIpcListeners();

    mainWindow.loadURL(
      isDev
        ? 'http://localhost:3000/'
        : url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true,
          })
    );
    await initializeDatabase();
  } catch (error) {
    fs.writeFileSync(path.join(appDir, 'error.log'), error);
    process.exit(1);
  }
};

run();
