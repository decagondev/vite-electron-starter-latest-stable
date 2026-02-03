/**
 * Electron main process
 * Manages application lifecycle and window creation
 */

import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Detect development mode
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged
// IMPORTANT: If your Vite dev server uses a different port, change 5173
// You can check your vite.config.ts or run 'npm run dev' to see the port
const WEB_PORT = process.env.VITE_PORT || 5173

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,        // Security: don't expose Node.js
      contextIsolation: true,        // Security: isolate context
      sandbox: false,                // May be needed for some libraries
    },
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    show: false, // Don't show until ready
  })

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  // Load the app
  if (isDev) {
    // Development: Load from Vite dev server
    mainWindow.loadURL(`http://localhost:${WEB_PORT}`)
    // Open DevTools in development
    mainWindow.webContents.openDevTools()
  } else {
    // Production: Load from built files
    let indexPath: string
    if (app.isPackaged) {
      // In packaged app, dist is in the app directory
      indexPath = join(__dirname, '../dist/index.html')
    } else {
      // In development build (not packaged), use relative path
      indexPath = join(__dirname, '../dist/index.html')
    }
    
    if (existsSync(indexPath)) {
      mainWindow.loadFile(indexPath)
    } else {
      console.error('Built index.html not found at:', indexPath)
      // Try alternative path structure (only if resourcesPath exists)
      if (process.resourcesPath) {
        const altPath = join(process.resourcesPath, 'app', 'dist', 'index.html')
        if (existsSync(altPath)) {
          mainWindow.loadFile(altPath)
        } else {
          console.error('Alternative path also not found:', altPath)
        }
      }
    }
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Security: Prevent new window creation
app.on('web-contents-created', (_event, contents) => {
  contents.setWindowOpenHandler(() => {
    // Prevent new window creation
    // Optionally open in external browser:
    // const { shell } = require('electron')
    // shell.openExternal(url)
    return { action: 'deny' }
  })
})

