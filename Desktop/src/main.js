// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Tray, Menu, shell } = require("electron");
const path = require("path");
const Store = require("electron-store");
const fenster = require("@electron/remote/main");
const setting = require("./defaultSettings");
const pkg = require("./../package.json");
const client = require("discord-rich-presence")("726837711851356242");

const date = Date.now();

function createWindow() {
  // Create the browser window.
  const store = new Store();

  const width = setting("electron.windowSize.width", 375);
  const height = setting("electron.windowSize.height", 812);
  const devTools = Boolean(setting("electron.devTools", "false"));
  const center = Boolean(setting("electron.centerOnOpen", "false"));

  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    frame: true,
    hasShadow: false,
    resizable: false,
    center: center,
    transparent: true,
    fullscreenable: true,
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    title: "Hentai Web Windows",
    icon: path.join(app.getAppPath(), "/build/ic_launcher.png"),
    webPreferences: {
      nativeWindowOpen: true,
      devTools: devTools,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  const webContents = mainWindow.webContents;

  Store.initRenderer();

  console.log(app.getPath("userData"));

  fenster.initialize();
  fenster.enable(webContents);

  const url = "https://www.dergoogler.com/hentai-web/?activity=main";
  const url_ = "http://192.168.178.81:5500/?activity=main";

  mainWindow.loadURL(url_);
  mainWindow.on("page-title-updated", function (e) {
    e.preventDefault();
  });

  webContents.setUserAgent("HENTAI_WEB_WINDOWS");

  const date = Date.now();

  ipcMain.on("dcrpc-state", (event, arg) => {
    client.updatePresence({
      state: arg,
      details: "Version " + pkg.version,
      startTimestamp: date,
      largeImageKey: "hentaiweb__",
      instance: true,
    });
  });

  ipcMain.on("dcrpc-state-disconnect", (event, arg) => {
    if (arg) {
      client.disconnect();
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray = null;
app.whenReady().then(() => {
  tray = new Tray(path.join(app.getAppPath(), "/build/ic_launcher.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Plain Settings Edit",
      type: "normal",
      click: () => {
        shell.openPath(app.getPath("userData") + "/config.json");
      },
    },
  ]);
  tray.setToolTip("Other settings/options");
  tray.setContextMenu(contextMenu);

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
