/**
 * Electron API mocks for testing
 * Allows testing Electron-dependent code without Electron runtime
 */

import type { ElectronAPI, IMemoryStats, INetworkStats, ISystemInfo } from '@shared/types/electron.d';

/**
 * Mock memory stats for testing
 */
export const mockMemoryStats: IMemoryStats = {
  total: 16 * 1024 * 1024 * 1024,
  used: 8 * 1024 * 1024 * 1024,
  free: 8 * 1024 * 1024 * 1024,
  usedPercent: 50,
};

/**
 * Mock network stats for testing
 */
export const mockNetworkStats: INetworkStats = {
  rxBytes: 1000000000,
  txBytes: 500000000,
  rxSec: 1024 * 1024,
  txSec: 512 * 1024,
};

/**
 * Mock system info for testing
 */
export const mockSystemInfo: ISystemInfo = {
  cpuModel: 'Intel Core i7-12700K',
  cpuCores: 12,
  osName: 'Windows 11',
  osVersion: '10.0.22000',
  hostname: 'test-machine',
};

/**
 * Mock Electron API object
 */
export const mockElectronAPI: ElectronAPI = {
  platform: 'win32',
  versions: {
    node: '20.0.0',
    chrome: '120.0.0',
    electron: '40.1.0',
  },
  isPackaged: false,
  getMemoryStats: async () => mockMemoryStats,
  getNetworkStats: async () => mockNetworkStats,
  getSystemInfo: async () => mockSystemInfo,
};

/**
 * Setup mock Electron environment
 * Call this in test setup to simulate Electron environment
 * 
 * @param platform - Platform to simulate (default: 'win32')
 * @param statsEnabled - Whether to enable stats API mocks (default: true)
 */
export function setupElectronMock(platform: string = 'win32', statsEnabled: boolean = true): void {
  const mockAPI: ElectronAPI = {
    platform,
    versions: {
      node: '20.0.0',
      chrome: '120.0.0',
      electron: '40.1.0',
    },
    isPackaged: false,
    getMemoryStats: statsEnabled ? async () => mockMemoryStats : async () => null,
    getNetworkStats: statsEnabled ? async () => mockNetworkStats : async () => null,
    getSystemInfo: statsEnabled ? async () => mockSystemInfo : async () => null,
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

/**
 * Create mock memory stats with custom values
 */
export function createMockMemoryStats(overrides: Partial<IMemoryStats> = {}): IMemoryStats {
  return {
    ...mockMemoryStats,
    ...overrides,
  };
}

/**
 * Create mock network stats with custom values
 */
export function createMockNetworkStats(overrides: Partial<INetworkStats> = {}): INetworkStats {
  return {
    ...mockNetworkStats,
    ...overrides,
  };
}
