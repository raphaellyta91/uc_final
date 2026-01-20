import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("chatAPI", {
  // enviar mensagem para o main
  sendMessage: (payload) => ipcRenderer.send("chat-message", payload),

  // ouvir novas mensagens vindas do main
  onMessage: (callback) => {
    ipcRenderer.on("chat-new", (event, mensagem) => {
      callback(mensagem);
    })
  }
})