import { app, BrowserWindow, ipcMain, shell } from "electron";
import * as fs from "fs/promises";
import * as path from "path";

const isDev = process.env.NODE_ENV === "development";

class App {
  private mainWindow: BrowserWindow;
  constructor() {
    this.setupApp();
  }

  private setupApp() {
    app.whenReady().then(() => this.createWindow());
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
    app.on("activate", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    this.setupIPC();
  }

  private createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js"),
      },
      titleBarStyle: "hiddenInset",
      show: false,
    });

    if (isDev) {
      this.mainWindow.loadURL("http://localhost:3000");
      this.mainWindow.webContents.openDevTools();
    } else {
      this.mainWindow.loadURL(
        `file://${path.join(__dirname, "../index.html")}`,
      );
    }

    this.mainWindow.once("ready-to-show", () => {
      this.mainWindow.show();
    });
  }

  private setupIPC() {
    //Файловая система
    ipcMain.handle(
      "fs:readFile",
      async (event: Electron.IpcMainInvokeEvent, path: string) => {
        try {
          const content = await fs.readFile(path, "utf-8");
          return content;
        } catch (err) {
          console.log("Error reading file: ", err);
          throw err;
        }
      },
    );
    ipcMain.handle(
      "fs:writeFile",
      async (event: Electron.IpcMainInvokeEvent, path: string) => {
        try {
          const content = await fs.writeFile(path, "utf-8");
          return content;
        } catch (err) {
          console.log("Error writing file: ", err);
          throw err;
        }
      },
    );
    ipcMain.handle(
      "fs:readDir",
      async (event: Electron.IpcMainInvokeEvent, path: string) => {
        try {
          const content = await fs.readdir(path, "utf-8");
          return content;
        } catch (err) {
          console.log("Error reading directory: ", err);
          throw err;
        }
      },
    );
    ipcMain.handle(
      "fs:createDir",
      async (event: Electron.IpcMainInvokeEvent, path: string) => {
        try {
          const content = await fs.mkdir(path, "utf-8");
          return content;
        } catch (err) {
          console.log("Error create directory: ", err);
          throw err;
        }
      },
    );

    //Приложения
    ipcMain.handle("app:getVersion", () => app.getVersion());
    ipcMain.handle("app:showItemInFolder", (_, path: string) => {
      require("electron").shell.showItemInFolder(path);
    });
  }
}

new App();
