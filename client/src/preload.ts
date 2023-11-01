// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getToken: () => ipcRenderer.invoke('getToken'),
  onLogout: (cb: ()=>any) => ipcRenderer.on('logout', () => cb()),
  onLock: (cb: ()=>any) => ipcRenderer.on('lock', () => cb()),
  setToken: (token: string) => ipcRenderer.send('setToken', token),
  changePassword: (cb: ()=>any) => ipcRenderer.on('changePassword', () => cb()),
});
