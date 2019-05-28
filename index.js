/* eslint-disable import/no-extraneous-dependencies */
const { app, BrowserWindow, Menu } = require('electron');
const DBHelper = require('./src/database/dbHelper');

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
        },
        {
            label: 'Database',
            submenu: [
                {
                    label: 'Delete Database',
                    click() {
                        DBHelper.DeleteDatabae();
                    }
                },
                {
                    label: 'Add person',
                    click() {
                        DBHelper.addPersonToDb();
                    }
                }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu);

    window = new BrowserWindow({
        width: 640,
        height: 480
    });
    window.loadFile('index.html');
    window.on('closed', () => {
        window = null;
    });
}

function databaseOperations() {
    DBHelper.databaseAutomation();
}

app.on('ready', createWindow);
app.on('ready', databaseOperations);
