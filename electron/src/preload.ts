import { contextBridge, ipcRenderer } from "electron";

// Экспортируем безопасные API в рендерер
contextBridge.exposeInMainWorld("electronAPI", {
  readFile: (path: string) => ipcRenderer.invoke("read-file", path),
  writeFile: (path: string, content: string) =>
    ipcRenderer.invoke("write-file", path, content),
  readDirectory: (path: string) => ipcRenderer.invoke("read-dir", path),

  // Информация о приложении
  getAppVersion: () => ipcRenderer.invoke("app:getVersion"),

  // Уведомления
  showNotification: (title: string, body: string) =>
    ipcRenderer.invoke("show-notification", title, body),
});

// Типы для TypeScript
declare global {
  interface Window {
    electronAPI: {
      readFile: (path: string) => Promise<any>;
      writeFile: (path: string, content: string) => Promise<any>;
      readDirectory: (path: string) => Promise<any>;
      getAppVersion: () => Promise<string>;
      showNotification: (title: string, body: string) => Promise<any>;
    };
  }
}
