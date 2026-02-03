/**
 * Electron API mocks for testing
 * Allows testing Electron-dependent code without Electron runtime
 */

import type { ElectronAPI } from '@shared/types/electron.d';

/**
 * Mock Electron API object
 */
export const mockElectronAPI: ElectronAPI = {
  platform: 'win32',
};

/**
 * Setup mock Electron environment
 * Call this in test setup to simulate Electron environment
 */
export function setupElectronMock(platform: string = 'win32'): void {
  const mockAPI: ElectronAPI = {
    platform,
  };
  
  Object.defineProperty(window, 'electronAPI', {
    value: mockAPI,
    writable: true,
    configurable: true,
  });
}

/**
 * Clear Electron mock
 * Call this in test cleanup
 */
export function clearElectronMock(): void {
  Object.defineProperty(window, 'electronAPI', {
    value: undefined,
    writable: true,
    configurable: true,
  });
}

/**
 * Create a custom mock for testing
 */
export function createElectronMock(overrides: Partial<ElectronAPI> = {}): ElectronAPI {
  return {
    ...mockElectronAPI,
    ...overrides,
  };
}
