/**
 * Electron main process
 * Manages application lifecycle and window creation
 * Implements security best practices for Electron 40+
 */

import { app, BrowserWindow, session } from 'electron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Environment configuration
 */
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged
const WEB_PORT = process.env.VITE_PORT || 5173

/**
 * Content Security Policy for production
 * Restricts what resources can be loaded
 */
const CONTENT_SECURITY_POLICY = isDev
  ? "default-src 'self' 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' ws://localhost:* http://localhost:*;"
  : "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';"

let mainWindow: BrowserWindow | null = null

/**
 * Create the main application window
 * Configured with security best practices
 */
function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    show: false,
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

/**
 * Configure security headers for all requests
 */
function setupSecurityHeaders(): void {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [CONTENT_SECURITY_POLICY],
      },
    })
  })
}

/**
 * Application initialization
 */
app.whenReady().then(() => {
  setupSecurityHeaders()
  createWindow()

  app.on('activate', () => {
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

/**
 * Security: Prevent new window creation and restrict navigation
 */
app.on('web-contents-created', (_event, contents) => {
  contents.setWindowOpenHandler(() => {
    return { action: 'deny' }
  })

  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)
    
    if (isDev && parsedUrl.origin === `http://localhost:${WEB_PORT}`) {
      return
    }
    
    if (!isDev && parsedUrl.protocol === 'file:') {
      return
    }
    
    event.preventDefault()
  })
})

