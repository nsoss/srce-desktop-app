import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import fs from 'fs';
import path from 'path';
import url from 'url';
import initializeDatabase from './initializeDatabase';
import { registerHandlers as registerIpcHandlers } from './ipc';

const appDir = path.dirname(app.getAppPath());

let mainWindow: BrowserWindow;
const run = async () => {
  try {
    await app.whenReady();
    mainWindow = new BrowserWindow({
      title: `Registar ${app.getVersion()}`,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    registerIpcHandlers();

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
