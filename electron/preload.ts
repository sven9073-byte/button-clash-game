import { contextBridge, ipcRenderer } from 'electron';

/**
 * Expose protected methods that allow the renderer process
 * to use ipcRenderer without exposing the entire object
 */
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Get application version
   */
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),

  /**
   * Save settings (for future use with file system)
   */
  saveSettings: (settings: any) => ipcRenderer.invoke('save-settings', settings),
});

// Type definitions for TypeScript
export interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  saveSettings: (settings: any) => Promise<{ success: boolean }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
