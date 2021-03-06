var file_formats = require('../renderer/file-actions.js').formats
let path = require('path')

function createWindow(data, title, format) {
  title = typeof title !== 'undefined'
    ? title
    : 'Untitled.csv'
  // if window is not initialized with any data, init with 3 blank cells
  data = typeof data !== 'undefined'
    ? data
    : '"","",""'
  // if window is not initialized with a format, default to csv
  format = typeof format !== 'undefined'
    ? format
    : file_formats.csv

  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.format = format

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`
  mainWindow.loadURL(winURL)

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.setTitle(title)
    mainWindow.webContents.send('loadData', data, format)
  })

  mainWindow.on('closed', function() {
    mainWindow = null
  })

  mainWindow.on('resize', function() {
    mainWindow.webContents.send('resized')
  })
}

function enableSave() {
  var item = Menu.getApplicationMenu().items[1].submenu.items[5]
  item.enabled = true
}

module.exports = {
  createWindow,
  enableSave
}
