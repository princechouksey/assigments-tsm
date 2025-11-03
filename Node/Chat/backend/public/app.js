const socket = io(); 
console.log(socket);
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", () => {
  const msg = input.value.trim();
  if (msg) {
    socket.emit("chatMessage", msg);
    input.value = "";
  }
});

socket.on("chatMessage", data => {
  const div = document.createElement("div");
  div.textContent = `${data.id.slice(0,5)}: ${data.message}`;
  messagesDiv.appendChild(div);
});
