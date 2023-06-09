const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
let d = __dirname.split('\\');
let dir = path.join(d[0],d[1],d[2]);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 720
  });
  //evit the load menu
  mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:2735/tasks');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const server = require('./server');
const port = 2735;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
var AutoLaunch = require('easy-auto-launch');

var AutoLauncher = new AutoLaunch({
	name: 'Tasks',
	path: path.join(dir, 'AppData', 'Local', 'Programs', 'tasks', 'Tasks.exe'),
});

AutoLauncher.enable();

//minecraftAutoLauncher.disable();


AutoLauncher.isEnabled()
.then(function(isEnabled){
	if(isEnabled){
	    return;
	}
	AutoLauncher.enable();
})
.catch(function(err){
    // handle error
});