// elementos
const btnEnter = document.getElementById("btnEnter")
const nameInput = document.getElementById("nameInput")
const options = document.getElementById("options")
const btnNewChat = document.getElementById("btnNewChat")
const chatArea = document.getElementById("chatArea")
const messagesDiv = document.getElementById("messages")
const msgInput = document.getElementById("msgInput")
const sendBtn = document.getElementById("sendBtn")

let myName = ""

// Avançar: salva nome e mostra opção
btnEnter.addEventListener("click", () => {
  const n = nameInput.value.trim()
  if (!n) {
    alert("Digite seu nome primeiro.")
    return
  }
  myName = n
  nameInput.disabled = true;
  btnEnter.disabled = true;
  options.style.display = "block";
  // Usuário 1 só mostra novo chat, por enquanto não abre chat automaticamente
});

// Novo Chat: mostrar área de chat (campo + enviar)
btnNewChat.addEventListener("click", () => {
  chatArea.style.display = "block"
  carregarHistorico()
})

// Enviar mensagem
sendBtn.addEventListener("click", () => {
  const txt = msgInput.value.trim()
  if (!txt) return

  const mensagem = {
    name: myName,
    text: txt,
    time: new Date().toLocaleTimeString()
  }

  salvarHistorico(mensagem)
  window.chatAPI.sendMessage(mensagem)

  msgInput.value = ""
})

// Receber mensagens (tanto as minhas quanto as do outro usuário)
//window.chatAPI.onMessage((mensagem) => {
  // garante que área de chat esteja visível (se recebeu msg e ainda não abriu)
 // chatArea.style.display = "block"
 // appendMessage(mensagem, mensagem.name === myName)
//});

// função para adicionar mensagem na tela
function appendMessage(m, isMine) {
  
  const p = document.createElement("div")

  p.classList.add("message")
  p.classList.add(isMine ? "msg-me" : "msg-other")
  
  p.innerHTML = `<strong>${m.name}</strong> <small style="float:right">${m.time}</small><div>${m.text}</div>`;
  
  messagesDiv.appendChild(p);
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