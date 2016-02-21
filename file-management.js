'use strict';
const fs = require('fs');
const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;

let filePath = undefined;


// opening a file
app.openFile = function() {
  dialog.showOpenDialog({
    filters: [{ name: 'Markdown', extensions: ['md'] }],
  }, function(files) {
    if (files) { openFile(files[0]); }
  });
}

function openFile(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    app.newWindow(data, { path });
  });
}

// saving a file
app.save = function() {
  const filePath = app.getFilePath();
  if (filePath != undefined) {
    writeFile(filePath);
  } else {
    app.saveAs();
  }
}

app.saveAs = function() {
  dialog.showSaveDialog(app.currentWindow, {
    filters: [{ name: 'Markdown', extensions: ['md'] }],
  }, function(file) {
    if (file) { writeFile(file) }
  });
}

function writeFile(path) {
  app.currentWindow.path = path;
  app.currentWindow.webContents.send('save');
}

ipcMain.on('save', function(event, content) {
  const path = app.getFilePath();
  fs.writeFile(path, content, function(err) {
    if (err) { console.log(err); }
  })
})

