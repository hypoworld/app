const { app, BrowserWindow, session, Menu, Tray } = require('electron');
const path = require('path');
const keytar = require('keytar');
const AutoLaunch = require('auto-launch');
require("./presence");

if(require('electron-squirrel-startup')) { 
    app.quit();
}

let mainWindow;
let tray = null;

app.setAppUserModelId("nl.habbo.HypoGame");

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

app.commandLine.appendSwitch("disable-renderer-backgrounding"), app.commandLine.appendSwitch("--enable-npapi"), app.commandLine.appendSwitch("--ppapi-flash-path", n), app.commandLine.appendSwitch("--ppapi-flash-version", r), app.commandLine.appendSwitch('ignore-certificate-errors', 'true'), app.commandLine.appendSwitch('allow-insecure-localhost', 'true');


let menuTemplate = [{
    label: 'Refresh',
    click: () =>
        mainWindow.reload(),
    },
    {
        label: 'Leeg cache',
        click: async () => {
            await session.defaultSession.clearStorageData();
            mainWindow.reload();
        }
    }
];

const createWindow = () => {
	keytar.findCredentials('hypo-data').then(result => {
		if (result.length > 0) {
			const s = result.find(res => res.account === "loginsession");
			if (s) {
				const cookie = {
					name: 'PHPSESSID',
					value: s.password,
					url: "https://hypoworld.nl",
				};

				session.defaultSession.cookies.set(cookie).then(() => {
					mainWindow.loadURL("https://hypoworld.nl");
				}, (error) => {
					console.error("cookie not set", error)
				});
			}
		}

		session.defaultSession.cookies.on('changed', (event, cookie, cause, removed) => {
			if (cookie.name === 'PHPSESSID') {
				keytar.setPassword('hypo-data', 'loginsession', cookie.value);
			}
		});

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

		if (process.platform !== 'darwin') {
			let menu = Menu.buildFromTemplate(menuTemplate);
        	Menu.setApplicationMenu(menu);
        }

		mainWindow.show();
	});
};

app.on('ready', () => {
    createWindow();

    // Tray icon (Windows)
    if (process.platform !== 'darwin') {
    	tray = new Tray(path.join(__dirname + '/icon.ico'));
    	
    	const contextMenu = Menu.buildFromTemplate([{
      		label: 'Afsluiten',
      		click() { app.quit(); },
    	}]);

    	tray.setToolTip('Hypo Game')
  		tray.setContextMenu(contextMenu)

    	tray.on('click', () => {
			mainWindow.show();
    	});
    };

    // Automatisch starten
	let autoLaunch = new AutoLaunch({
		name: 'Hypo Game',
		path: app.getPath('exe'),
	});

	autoLaunch.isEnabled().then((isEnabled) => {
		if (!isEnabled) autoLaunch.enable();
	});
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit(); } });
app.on('activate', () => { if (mainWindow === null) { createWindow(); } });