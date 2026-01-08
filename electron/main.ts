import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;

/**
 * Creates the main application window
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    autoHideMenuBar: true,
    title: 'Button Clash',
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/**
 * App lifecycle: Ready event
 */
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

/**
 * App lifecycle: Window close events
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * IPC Handlers for communication with renderer process
 */

// Example: Get app version
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

// Store settings in local storage (handled by renderer)
ipcMain.handle('save-settings', (_event, settings) => {
  // Settings will be saved via localStorage in renderer
  return { success: true };
});
