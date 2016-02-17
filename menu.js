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
  }
]

app.on('ready', function() {
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
});
