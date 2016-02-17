'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
require('./menu');

let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 650,
    center: true,
    minWidth: 600,
    minHeight: 300,
  });

  // mainWindow.webContents.openDevTools();
  mainWindow.loadURL('file://'+__dirname+'/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
