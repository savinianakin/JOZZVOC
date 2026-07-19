// Variable pour stocker les touches tapées et le code secret
let secretInput = "";
const accessCode = "1337";

// ÉCOUTE DU CODE SECRET DE DOUBLE FOND
window.addEventListener("keydown", (event) => {
    // Si l'utilisateur est en train d'écrire un message, on n'écoute pas son code secret
    if (document.activeElement === document.getElementById("message")) return;

    // Enregistre la touche enfoncée
    secretInput += event.key;
    
    // Garde uniquement les derniers caractères de la taille du code secret
    if (secretInput.length > accessCode.length) {
        secretInput = secretInput.substr(secretInput.length - accessCode.length);
    }

    // VÉRIFICATION DU CODE SECRET
    if (secretInput === accessCode) {
        const vault = document.getElementById("fake-vault");
        const chat = document.querySelector(".chat-container");
        
        if (vault) {
            vault.style.transition = "opacity 0.4s ease";
            vault.style.opacity = "0"; // Fait disparaître la page 404
            setTimeout(() => vault.remove(), 400); // Supprime l'élément HTML du site
        }
        
        if (chat) {
            chat.classList.add("unlocked"); // Fait apparaître le chat Matrix
        }
        
        alert("RÉSEAU SÉCURISÉ REJONT. INITIALISATION DU PROTOCOLE CHIFFRÉ...");
    }
});

// INITIALISATION DU CHAT ET DES SOCKETS
const socket = io();

const username = document.getElementById("username");
const message = document.getElementById("message");
const send = document.getElementById("send");
const messages = document.getElementById("messages");
const users = document.getElementById("users");

// 1. EFFET DE DÉCHIFFREMENT MATRIX
function decryptTextEffect(element, finalText) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$@%&?_+=/*";
    const duration = 12; 
    let currentIteration = 0;
    
    element.innerText = finalText.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("");

    const interval = setInterval(() => {
        element.innerText = finalText
            .split("")
            .map((letter, index) => {
                if (letter === " ") return " ";
                if (index < (finalText.length * (currentIteration / duration))) {
                    return finalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (currentIteration >= duration) {
            element.innerText = finalText; 
            clearInterval(interval);
        }
        currentIteration++;
    }, 40); 
}

function getFormattedTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function logSystemMessage(text) {
    const div = document.createElement("div");
    div.className = "system-message";
    const textSpan = document.createElement("span");
    div.appendChild(textSpan);
    messages.appendChild(div);
    decryptTextEffect(textSpan, text);
    messages.scrollTop = messages.scrollHeight;
}

// 2. ENVOI DU MESSAGE + CENTRE DE COMMANDES DU TERMINAL
function sendMessage() {
    const rawInput = message.value.trim();
    if (rawInput === "") return;

    message.value = "";
    message.focus();

    // DÉTECTION D'UNE COMMANDE (/)
    if (rawInput.startsWith("/")) {
        const args = rawInput.split(" ");
        const command = args.toLowerCase();

        switch (command) {
            case "/panic":
                messages.innerHTML = ""; 
                window.location.reload(); // Actualise pour re-verrouiller le site sur le 404 !
                break;

            case "/hack":
                const target = args.slice(1).join(" ") || "RÉSEAU CENTRAL";
                logSystemMessage(`INITIATING CYBER ATTACK ON: ${target.toUpperCase()}...`);
                setTimeout(() => logSystemMessage("> BYPASSING FIREWALL... STATUS: OK"), 400);
                setTimeout(() => logSystemMessage("> BRUTEFORCING ACCESS TOKENS..."), 800);
                setTimeout(() => logSystemMessage(`> SUCCESS: ROOT ACCESS GRANTED ON ${target.toUpperCase()}`), 1400);
                break;

            case "/flood":
                logSystemMessage("CLEANING INTERFACE LOBBY...");
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        const blank = document.createElement("div");
                        blank.style.height = "20px";
                        messages.appendChild(blank);
                        messages.scrollTop = messages.scrollHeight;
                    }, i * 30);
                }
                setTimeout(() => logSystemMessage("LOBBY BUFFER FLUSHED."), 500);
                break;

            case "/crypto":
                logSystemMessage("FETCHING MARKET BLOCKCHAIN DATA...");
                fetch("https://coingecko.com")
                    .then(res => res.json())
                    .then(data => {
                        const price = data.bitcoin.usd;
                        logSystemMessage(`[MARKET] BTC/USD: $${price.toLocaleString()} USD`);
                    })
                    .catch(() => logSystemMessage("[ERROR] FAILED TO CONNECT TO BLOCKCHAIN API"));
                break;

            case "/status":
                logSystemMessage("[DIAGNOSTIC] CODES STATUS CHANNELS...");
                setTimeout(() => logSystemMessage(`> MEMORY NODE BUFFER: ${(Math.random() * 30 + 10).toFixed(1)}MB // STABLE`), 300);
                setTimeout(() => logSystemMessage("> SECURITY LAYER: AES-256-GCM ACTIVE"), 600);
                setTimeout(() => logSystemMessage("> PROXY TUNNELS: ENCRYPTED"), 900);
                break;

            case "/clear":
                messages.innerHTML = "";
                logSystemMessage("CHAT HISTORY PURGED FROM LOCAL RAM.");
                break;

            case "/anon":
                const id = Math.floor(1000 + Math.random() * 9000);
                username.value = `OPERATOR_#${id}`;
                logSystemMessage(`NEW IDENTITY ASSIGNED: OPERATOR_#${id}`);
                break;

            case "/dice":
                if (username.value.trim() === "") {
                    logSystemMessage("[ERROR] SET A USERNAME BEFORE ROLLING DICE");
                    return;
                }
                const diceRoll = Math.floor(Math.random() * 100) + 1;
                socket.emit("chat message", {
                    username: "Système", 
                    message: `🎰 [DICE] ${username.value.trim()} rolled the cyber dice: ${diceRoll}/100`,
                    time: getFormattedTime()
                });
                break;

            case "/matrix":
                logSystemMessage("INJECTING MATRIX CORRUPTION INTERFACE...");
                messages.style.transition = "all 0.1s ease";
                messages.style.background = "rgba(0, 255, 102, 0.4)";
                
                let count = 0;
                const glitch = setInterval(() => {
                    messages.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                    count++;
                    if (count > 8) {
                        clearInterval(glitch);
                        messages.style.transform = "none";
                        messages.style.background = "rgba(5, 8, 6, 0.2)";
                        logSystemMessage("SYSTEM STABILIZED.");
                    }
                }, 50);
                break;

            default:
                logSystemMessage(`[ERROR] UNKNOWN COMMAND: ${command}. TRY: /hack, /flood, /crypto, /status, /clear, /anon, /dice, /matrix, /panic`);
                break;
        }
        return; 
    }

    if (username.value.trim() === "") return;

    socket.emit("chat message", {
        username: username.value.trim(),
        message: rawInput,
        time: getFormattedTime()
    });
}

send.addEventListener("click", sendMessage);

message.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// 3. RÉCEPTION DU MESSAGE DU SERVEUR
socket.on("chat message", (data) => {
    const div = document.createElement("div");
    
    if (data.username === "Système") {
        div.className = "system-message";
    } else if (data.username === username.value.trim()) {
        div.className = "my-message";
    } else {
        div.className = "other-message";
    }

    const textSpan = document.createElement("span");
    decryptTextEffect(textSpan, data.message);

    const timeSmall = document.createElement("small");
    timeSmall.innerText = data.time;

    if (data.username === "Système") {
        div.appendChild(textSpan);
    } else if (data.username === username.value.trim()) {
        div.appendChild(textSpan);
        div.appendChild(timeSmall);
    } else {
        const nameStrong = document.createElement("strong");
        nameStrong.innerText = data.username;
        nameStrong.style.display = "block";
        nameStrong.style.fontSize = "12px";
        nameStrong.style.color = "#ff3366";
        nameStrong.style.marginBottom = "4px";

        div.appendChild(nameStrong);
        div.appendChild(textSpan);
        div.appendChild(timeSmall);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});

// 4. COMPTEUR DE NOEUDS
socket.on("user count", (number) => {
    if (users) {
        users.innerHTML = `NODES: ${number} // ENCRYPTED`;
    }
});
