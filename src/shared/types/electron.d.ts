/**
 * Electron API type definitions
 * Must match the API exposed in electron/preload.ts
 */

export interface ElectronVersions {
  node: string;
  chrome: string;
  electron: string;
}

export interface ElectronAPI {
  /** Current platform (win32, darwin, linux) */
  platform: string;
  /** Version information for Node, Chrome, and Electron */
  versions: ElectronVersions;
  /** Whether the app is packaged for production */
  isPackaged: boolean;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

