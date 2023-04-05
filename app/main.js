const { app, BrowserWindow } = require('electron')
const electronReload = require('electron-reload')
const gotTheLock = app.requestSingleInstanceLock()
const path = require('path')

let win = null

const createWindow = () => {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      autoHideMenuBar: true,
      icon: __dirname + '/assets/icon.png'
    })
  
    win.loadFile('app/index.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
});


if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
    
  // Create BrowserWindow, load the rest of the app, etc...
  app.on('ready', () => {
  })
}