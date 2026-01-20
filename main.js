import { app, BrowserWindow, ipcMain } from "electron"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let win1
let win2

function criarJanelas() {
  // Janela do Usuário 1
  win1 = new BrowserWindow({
    width: 420,
    height: 540,
    title: "Chat - Usuário 1",
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win1.loadFile("index1.html");

  // Janela do Usuário 2
  win2 = new BrowserWindow({
    width: 420,
    height: 540,
    title: "Chat - Usuário 2",
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win2.loadFile("index2.html");
}

app.whenReady().then(criarJanelas) // executa as janelas




//fecha telas 
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})






// Recebe mensagem de qualquer renderer e repassa para as duas janelas
ipcMain.on("chat-message", (event, mensagem) => {
  
  if (win1 && !win1.isDestroyed()) win1.webContents.send("chat-new", mensagem)
  if (win2 && !win2.isDestroyed()) win2.webContents.send("chat-new", mensagem)
})
