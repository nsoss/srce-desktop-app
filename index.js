const { app, BrowserWindow } = require("electron");

let window;
function createWindow() {
  window = new BrowserWindow({ width: 640, height: 480 });
  window.loadFile("index.html");
  window.on("closed", () => {
    window = null;
  });
}

app.on("ready", createWindow);
