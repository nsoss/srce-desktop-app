/* eslint-disable import/no-extraneous-dependencies */
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const dbHelper = require('./src/database/dbHelper');

let window;

function createWindow() {
    // Menu
    const menu = Menu.buildFromTemplate([
        {
            label: 'Main',
            submenu: [
                {
                    label: 'Exit',
                    click() {
                        app.quit();
                    }
                }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu);

    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 'max',
        height: 'max'
    });
    window.loadURL('http://localhost:3000');
    window.on('closed', () => {
        window = null;
    });

    ipcMain.on('getVolunteerNames', async function() {
        const result = await dbHelper.getVolunteerNames();
        window.webContents.send('volunteerNamesSent', result);
    });

    window.setMenu(null);
}
function databaseOperations() {
    dbHelper.checkIfDatabaseExists();
}

app.on('ready', databaseOperations);
app.on('ready', createWindow);
