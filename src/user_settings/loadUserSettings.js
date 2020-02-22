const remote = window.require('electron').remote;
const fs = remote.require('fs');
const app = remote.app;
const pathSettings = app.getAppPath() + '/settings.json';

export function fileRead() {
    return JSON.parse(fs.readFileSync(pathSettings).toString());
}

export function fileWrite(data) {
    fs.writeFile(pathSettings, JSON.stringify(data), function(err) {
        if (err) {
        }
    });
}
