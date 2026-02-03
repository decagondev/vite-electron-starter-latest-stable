/**
 * Electron preload script
 * Runs in isolated context with access to both DOM and Node.js APIs
 * Exposes safe APIs to the renderer process via context bridge
 * 
 * Security: Only expose minimal, safe APIs through contextBridge
 * All exposed methods should be type-safe and validated
 */

import { contextBridge } from 'electron'

/**
 * Electron API interface
 * Define all methods exposed to the renderer process
 * This should match the ElectronAPI type in src/shared/types/electron.d.ts
 */
interface ElectronAPI {
  platform: NodeJS.Platform;
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
  isPackaged: boolean;
}

/**
 * Create the API object to expose
 */
const electronAPI: ElectronAPI = {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  isPackaged: !process.env.NODE_ENV?.includes('development'),
}

/**
 * Expose protected methods to the renderer process
 * Uses contextBridge for secure communication
 */
contextBridge.exposeInMainWorld('electronAPI', electronAPI)

