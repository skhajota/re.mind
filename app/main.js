const { app, BrowserWindow, Menu, Notification } = require('electron')
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

const createMenu = () => {
  contexMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click: () => app.quit()
    }    
  ]);
}

app.whenReady().then(() => {
  createWindow();
  createMenu();

  setInterval( ()=> {
    // Every minute
    checkCalendar()
  }, 5*1000)
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit()
  }
})

// Reloads app while its running
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
});

// Make sure there is only one app instance
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
};

// Write and send notification
const sendNotification = (body) => {
  if (!Notification.isSupported()) return;

  const notification = new Notification({
    title: 'Reminder',
    body: body,
    icon: __dirname + '/assets/icon.png'
  });

  notification.show()
};

const checkCalendar = () => {
  
  // Parse calendar.json
  var fs = require('fs');
  var calendar = JSON.parse(fs.readFileSync(path.join(__dirname,'/db/calendar.json'), 'utf8'));


  // Get times in seconds
  let now = new Date().getTime()*0.001;
  let then = new Date(calendar.events[0].date_time).getTime()*0.001;
  // Get time zone offset in seconds
  let offset =  (new Date().getTimezoneOffset()*(-60));

  let trigger = then-(now+offset)

  console.log(now);
  console.log(then);
  console.log(trigger);

  if (trigger < 0){
    sendNotification(calendar.events[0].message)
    // TODO: remove event 
  }
};