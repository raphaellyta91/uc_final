const btnEnter = document.getElementById("btnEnter");
const nameInput = document.getElementById("nameInput");
const chatArea = document.getElementById("chatArea");
const messagesDiv = document.getElementById("messages");
const msgInput = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");

let myName = "";

btnEnter.addEventListener("click", () => {
  const n = nameInput.value.trim();
  if (!n) {
    alert("Digite seu nome primeiro.");
    return
  }
  myName = n;
  nameInput.disabled = true;
  btnEnter.disabled = true;
  chatArea.style.display = "block";
})

btnNewChat.addEventListener("click", () => {
  chatArea.style.display = "block"

  messagesDiv.innerHTML = "";// Limpa tudo
  carregarHistorico()// Carrega tudo da memoria

  //setTimeout(atualizaChat, 2000)// A cada 2 segundos atualiza o chat
})

// Enviar mensagem
sendBtn.addEventListener("click", () => {
  const txt = msgInput.value.trim();
  if (!txt) return;

  const mensagem = {
    name: myName,
    text: txt,
    time: new Date().toLocaleTimeString()
  }

  salvarHistorico(mensagem)
  msgInput.value = ""

  messagesDiv.innerHTML = "";// Limpa tudo
  carregarHistorico()// Carrega tudo da memoria
});

// Receber mensagens
//window.chatAPI.onMessage((mensagem) => {
 // appendMessage(mensagem, mensagem.name === myName);
//});

function appendMessage(m, isMine) {
  const p = document.createElement("div");
  p.classList.add("message");
  p.classList.add(isMine ? "msg-me" : "msg-other");
  p.innerHTML = `<strong>${m.name}</strong> <small style="float:right">${m.time}</small><div>${m.text}</div>`;
  messagesDiv.appendChild(p);
  //messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
 
function salvarHistorico(mensagem) {
  let historico = JSON.parse(localStorage.getItem("chatHistorico")) || []
  historico.push(mensagem);
  localStorage.setItem("chatHistorico", JSON.stringify(historico));
}

function carregarHistorico() {
  let historico = JSON.parse(localStorage.getItem("chatHistorico")) || []
  historico.forEach(m => {
    appendMessage(m, m.name === myName)
  })
}

// Nova adição
document.addEventListener("DOMContentLoaded", () => {
    // Assim que carrega a pagina chama a função recorrente para atualizar
    atualizaChat()
})

function atualizaChat() {
    messagesDiv.innerHTML = "";// Limpa tudo
    carregarHistorico()// Carrega tudo da memoria

    setTimeout(atualizaChat, 2000)// A cada 2 segundos atualiza o chat
    console.log('Atualizei')
}
