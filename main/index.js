const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { loadTasks, saveTasks } = require('./taskStorage');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 400,
    alwaysOnTop: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:5173'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
}

app.whenReady().then(createWindow);

ipcMain.handle('load-tasks', () => loadTasks());
ipcMain.handle('save-tasks', (_, tasks) => saveTasks(tasks));