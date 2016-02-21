'use strict';

const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;

require('./menu');
require('./file-management');

app.currentWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  app.newWindow();
});

// Creates a new window
// ==== arguments
// *content* - Content to be loaded into the editor
app.newWindow = function(content, options) {
  const newWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    center: true,
    minWidth: 600,
    minHeight: 300,
    titleBarStyle: 'hidden',
  });

  newWindow.loadURL('file://'+__dirname+'/index.html');
  newWindow.webContents.on('did-finish-load', function() {
    const editorContent = content || '';
    newWindow.webContents.send('setContent', editorContent);

    const path = options != undefined ? options.path : undefined
    newWindow.path = path
    // newWindow.webContents.openDevTools();
  });

  newWindow.on('focus', function() {
    this.currentWindow = newWindow;
  }.bind(this));

  this.currentWindow = newWindow;
}

app.getFilePath = function() {
  const window = app.currentWindow;
  if (window) { return window.path; }
}
