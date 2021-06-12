const { app, BrowserWindow } = require('electron');
const path = require('path');

if(require('electron-squirrel-startup')) { 
    app.quit();
}

let n, r;
switch (process.platform) {
    case "darwin":
        n = path.join(__dirname.includes(".asar") ? process.resourcesPath : __dirname, "../plugins/flash/osx/PepperFlashPlayer.plugin"), r = "32.0.0.363"
    break;

    default:
    if (process.arch === 'x64' || process.arch === 'arm64')
        n = path.join(__dirname.includes(".asar") ? process.resourcesPath : __dirname, "../plugins/flash/win/x64/pepflashplayer.dll"), r = "32.0.0.363";
    else
        n = path.join(__dirname.includes(".asar") ? process.resourcesPath : __dirname, "../plugins/flash/win/x32/pepflashplayer.dll"), r = "32.0.0.363";
    break;
}

app.commandLine.appendSwitch("--ppapi-flash-path", n), app.commandLine.appendSwitch("--ppapi-flash-version", r);

const createWindow = () => {
        mainWindow = new BrowserWindow({
            title: "Hypo Game",
            webPreferences: {
                plugins: true,
                nodeIntegration: false,
                webviewTag: true,
            },
            width: 1280,
            height: 730,
            show: false,
            frame: true,
            backgroundColor: "#ccc",
            icon: __dirname + '/icon.ico',
        });
        
        mainWindow.loadURL("https://hypoworld.nl")
        
        mainWindow.on('closed', () => {
            mainWindow = null;
        });
        
        // mainWindow.maximize();
        mainWindow.show();
    };

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit(); } });
app.on('activate', () => { if (mainWindow === null) { createWindow(); } });