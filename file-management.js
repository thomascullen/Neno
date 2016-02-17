'use strict';

const fs = require('fs');
const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;

let filePath = null;

app.openFile = function() {
  dialog.showOpenDialog(app.mainWindow, {
    filters: [{ name: 'Markdown', extensions: ['md'] }],
  }, function(files) {
    if (files) {
      openFile(files[0]);
    }
  });
}

app.saveAs = function() {
  dialog.showSaveDialog(app.mainWindow, {
    filters: [{ name: 'Markdown', extensions: ['md'] }],
  }, function(file) {
    writeFile(file);
  });
}

function writeFile(path) {
  filePath = path;
  app.mainWindow.webContents.send('save');
}

ipcMain.on('save', function(event, content) {
  fs.writeFile(filePath, content, function(err) {
    if (err) {
      console.log(err);
    }
  })
})

function openFile(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    filePath = path
    app.mainWindow.webContents.send('open', data);
  });
}
