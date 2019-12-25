const remote = window.require('electron').remote;
const fs = remote.require('fs');
const app = remote.app;
const pathSettings = app.getAppPath() + "/settings.json";

export function fileRead() {
    return JSON.parse(fs.readFileSync(pathSettings).toString());
}

let m = fileRead();

export function fileWrite(data) {
    fs.writeFile(pathSettings, JSON.stringify(data), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}
