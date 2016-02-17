'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

require('./menu');
require('./file-management');

app.mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  app.mainWindow = new BrowserWindow({
    width: 1000,
    height: 650,
    center: true,
    minWidth: 600,
    minHeight: 300,
  });

  app.mainWindow.webContents.openDevTools();
  app.mainWindow.loadURL('file://'+__dirname+'/index.html');
  app.mainWindow.on('closed', function() {
    app.mainWindow = null;
  });
});
