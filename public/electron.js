// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, protocol, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const sqlite3 = require("sqlite3");
const fs = require("fs");

// Create the native browser window.
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";
  mainWindow.loadURL(appURL);

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
const allowedNavigationDestinations = "https://my-electron-app.com";
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault();
    }
  });
});
//--------------------------- register ehleed shalgana bhgui bol burtgene--------------------------

ipcMain.handle("registerCheck", async (event, data) => {
  const db = new sqlite3.Database("data1.db");
  const ress = await new Promise((resolve, reject) =>
    db.all(
      `SELECT email FROM login WHERE email ="${data.Email}"`,
      (err, rows) => (err ? reject(err) : resolve(rows))
    )
  );
  if (ress.length === 0) {
    db.run(
      `INSERT INTO login (name, email, password) VALUES
      ('${data.Name}', '${data.Email}', '${data.Passport}')`,
      (err, result) => {
        console.log("err-->", err);
      }
    );
  }
  db.close();
  return ress;
});

//------------------------- login -------------------------------------
ipcMain.handle("loginProgram", async (event, data) => {
  const db = new sqlite3.Database("data1.db");
  const ress = await new Promise((resolve, reject) =>
    db.all(
      `SELECT * FROM login WHERE email ="${data.LoginEmail}"`,
      (err, rows) => (err ? reject(err) : resolve(rows))
    )
  );
  db.close();

  return ress;
});

//----------------------get Test Data-------------------------------
ipcMain.handle("getTestData", async (event, data) => {
  const db = new sqlite3.Database("data1.db");
  const ress = await new Promise((resolve, reject) =>
    db.all(`SELECT * FROM sub${data}`, (err, rows) =>
      err ? reject(err) : resolve(rows)
    )
  );
  db.close();
  return ress;
});

//----------------------test-------------------------------
ipcMain.handle("saveTest", (event, data) => {
  const db = new sqlite3.Database("data1.db");
  db.run(
    `CREATE TABLE IF NOT EXISTS "sub${data.subGroupID}" ( "id" INTEGER NOT NULL,"test" TEXT, "aResult" TEXT,
	"bResult"	TEXT,"cResult" TEXT,"dResult" TEXT, PRIMARY KEY("id" AUTOINCREMENT) )`,
    (err) => {
      if (err) {
        console.log("err", err);
        return "shineeer uusgeh aldaa";
      }

      console.log("sql uussen bn");
      return "shineer uusgeh no error";
    }
  );
  db.close();
  const ds = new sqlite3.Database("data1.db");
  ds.run(
    `INSERT INTO sub${data.subGroupID} (test, aResult, bResult, cResult, dResult) VALUES
    ('${data.Test}', '${data.AResult}', '${data.BResult}', '${data.CResult}','${data.DResult}')`,
    (err) => {
      console.log("err-->", err);
    }
  );
  ds.close();
  return data;
});

ipcMain.handle("testdata", async (event, data) => {
  const db = new sqlite3.Database("data1.db");
  db.run(
    `CREATE TABLE IF NOT EXISTS "sub${data.subGroupID}" ( "id" INTEGER NOT NULL,"test" TEXT, "aResult" TEXT,
  "bResult"	TEXT,"cResult" TEXT,"dResult" TEXT, PRIMARY KEY("id" AUTOINCREMENT) )`,
    (err) => {
      if (err) {
        console.log("err", err);
        return "shineeer uusgeh aldaa";
      }

      console.log("sql uussen bn");
      return "shineer uusgeh no error";
    }
  );

  const testt = await new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS "sub${data}" ( "id" INTEGER NOT NULL,"test" TEXT, "aResult" TEXT,
  "bResult"	TEXT,"cResult" TEXT,"dResult" TEXT, PRIMARY KEY("id" AUTOINCREMENT) )`,
      (err, okey) => (err ? reject(err) : resolve(okey))
    );
  });
  console.log("testt", testt);
  const ress = await new Promise((resolve, reject) =>
    db.all(`SELECT * FROM sub${data}`, (err, rows) =>
      err ? reject(err) : resolve(rows)
    )
  );
  console.log("object, ", ress);
  db.close();
  return ress;
});

//-------------------------sub menu------------------------------
ipcMain.handle("deletebyId", async (event, arg) => {
  const db = new sqlite3.Database("data1.db");
  const res = await new Promise((resolve, reject) => {
    db.run(`DELETE FROM submenu WHERE id=${arg}`);
    resolve("id-item-ok");
    reject("id-item-error");
  });
  console.log("res", res);
  const res1 = await new Promise((resolve, reject) => {
    db.run(`DROP TABLE IF EXISTS sub${arg}`);
    resolve("drop-ok");
    reject("drop-error");
  });
  console.log("res1", res1);
  db.close();
  return res1;
});

ipcMain.handle("addSubMenu", async (event, arg) => {
  const db = new sqlite3.Database("data1.db");
  const res = await new Promise((resolve, reject) =>
    db.run(`INSERT INTO submenu (name) VALUES ("${arg}")`, (err, result) => {
      err ? reject(err) : resolve(result);
    })
  );
  db.close();
  return res;
});

ipcMain.handle("readsubMenu", async (event, arg) => {
  const db = new sqlite3.Database("data1.db");
  const ress = await new Promise((resolve, reject) =>
    db.all("SELECT * FROM submenu", (err, rows) =>
      err ? reject(err) : resolve(rows)
    )
  );
  db.close();
  return ress;
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
