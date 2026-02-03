/**
 * Electron preload script
 * Runs in isolated context with access to both DOM and Node.js APIs
 * Exposes safe APIs to the renderer process via context bridge
 */

import { contextBridge } from 'electron'

// Expose protected methods that allow the renderer process to use
// the APIs in a safe way
contextBridge.exposeInMainWorld('electronAPI', {
  // Add any Electron-specific APIs here if needed in the future
  // For now, we just expose the API object to detect Electron environment
  platform: process.platform,
})

