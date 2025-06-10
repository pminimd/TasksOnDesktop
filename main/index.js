const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { loadTasks, saveTasks } = require('./taskStorage');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    transparent: true,       // ✅ 背景透明
    frame: false,            // ✅ 无边框，自定义标题栏，才能实现拖动
    alwaysOnTop: true,       // ✅ 悬浮在最上层（可选）
    hasShadow: false,        // ✅ 去掉阴影（美观用）
    resizable: false,        // ✅ 禁止缩放（可选）
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),  // 如果有的话
      nodeIntegration: true,
      contextIsolation: false,
    }
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