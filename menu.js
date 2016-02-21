const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

const menuTemplate = [
  {
    label: 'Markdown',
    submenu: [
      {
        label: 'About'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() { app.quit(); }
      },
    ]
  },
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: 'Command+o',
        click: function() { app.openFile(); }
      },
      {
        label: 'Save',
        accelerator: 'Command+s',
        click: function() { app.save(); }
      },
      {
        label: 'Save As',
        accelerator: 'Command+shift+s',
        click: function() { app.saveAs(); }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Preview',
        accelerator: 'Command+p',
        click: function() {
          const window = app.currentWindow;
          if (window) {
            window.webContents.send('togglePreview');
          }
        }
      }
    ]
  }
]

app.on('ready', function() {
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
});
