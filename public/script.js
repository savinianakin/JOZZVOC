const socket = io();

const username = document.getElementById("username");
const message = document.getElementById("message");
const send = document.getElementById("send");
const messages = document.getElementById("messages");


function sendMessage() {

    if (username.value === "" || message.value === "") return;

    socket.emit("chat message", {
        username: username.value,
        message: message.value,
        time: new Date().toLocaleTimeString()
    });

    message.value = "";
}


send.addEventListener("click", sendMessage);


message.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        sendMessage();
    }

});


socket.on("chat message", (data) => {

    const p = document.createElement("p");

    p.innerHTML = `
        <strong>${data.username}</strong>
        <small>${data.time}</small>
        <br>
        ${data.message}
    `;

    messages.appendChild(p);

    messages.scrollTop = messages.scrollHeight;

});

const users = document.getElementById("users");

socket.on("user count", (number) => {

    users.innerHTML = 
    `👥 Utilisateurs connectés : ${number}`;

});