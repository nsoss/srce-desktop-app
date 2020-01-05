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
            ],
            label: 'Tools',
            submenu: [
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Ctrl+Shift+I',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.toggleDevTools()
                        }
                    }
                }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu);

    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    window.maximize();
    window.loadURL('http://localhost:3000');

    window.on('closed', () => {
        window = null;
    });

    ipcMain.on('getVolunteers', async function () {
        const result = await dbHelper.getVolunteers();
        window.webContents.send('volunteersSent', result);
    });

    ipcMain.on('deleteVolunteer', async (event, id) => {
        const result = await dbHelper.deleteVolunteer(id);
        window.webContents.send('volunteerDeleted', result);
    });

    ipcMain.on('insertVolunteer', async (event, volunteer) => {
        const insertedID = await dbHelper.insertVolunteer(volunteer);
        window.webContents.send('volunteerInserted', insertedID);
    });

    ipcMain.on('insertCall', async (event, call) => {
        const insertedCall = await dbHelper.insertCall(call);
        window.webContents.send('callInserted', insertedCall);
    });

    ipcMain.on('getCalls', async function () {
        const results = await dbHelper.getCalls();
        window.webContents.send('callsSent', results);
    });

    ipcMain.on('getFormData', async function () {
        const results = await dbHelper.getFormData();
        window.webContents.send('formDataSent', results);
    });

    window.setMenu(menu);
}
function databaseOperations() {
    dbHelper.checkIfDatabaseExists();
}

app.on('ready', databaseOperations);
app.on('ready', createWindow);
