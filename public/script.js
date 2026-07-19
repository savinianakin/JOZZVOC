alert("Nouveau script chargé ! Protocoles de déverrouillage universels actifs.");

const socket = io();

const username = document.getElementById("username");
const message = document.getElementById("message");
const send = document.getElementById("send");
const messages = document.getElementById("messages");
const users = document.getElementById("users");

// Éléments du Double Fond
const fakeVault = document.getElementById("fake-vault");
const chatContainer = document.querySelector(".chat-container");

// Fonction magique pour déverrouiller le chat secret
function unlockSecretChat() {
    if (fakeVault) {
        fakeVault.style.transition = "opacity 0.4s ease";
        fakeVault.style.opacity = "0"; // Fait disparaître la page 404
        setTimeout(() => fakeVault.remove(), 400); // Supprime l'élément HTML
    }
    
    if (chatContainer) {
        chatContainer.classList.add("unlocked"); // Fait apparaître le chat Matrix
    }
    
    alert("RÉSEAU SÉCURISÉ REJOINT. INITIALISATION DU PROTOCOLE CHIFFRÉ...");
    setTimeout(() => message.focus(), 500);
}

// DÉVERROUILLAGE SÉCURISÉ PC & MOBILE : Triple clic/tape sur le titre "ERROR 404"
const secretTrigger = document.querySelector("#fake-vault h2");
let clickCount = 0;
let clickTimer = null;

if (secretTrigger) {
    secretTrigger.style.cursor = "pointer"; // Reste discret mais cliquable
    
    secretTrigger.addEventListener("click", () => {
        clickCount++;
        
        // Réinitialise le compteur si l'utilisateur met trop de temps entre les clics
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 1000); // 1 seconde maximum pour faire les 3 clics

        // Au bout de 3 clics ou tapes rapides
        if (clickCount === 3) {
            unlockSecretChat();
            clickCount = 0;
        }
    });
}

// ==========================================
// EFFET DE DÉCHIFFREMENT MATRIX SUR LE TEXTE
// ==========================================
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

// ==========================================
// ENVOI DU MESSAGE + TERMINAL DE COMMANDES
// ==========================================
function sendMessage() {
    const rawInput = message.value.trim();
    if (rawInput === "") return;

    message.value = "";
    message.focus();

    if (rawInput.startsWith("/")) {
        const args = rawInput.split(" ");
        const command = args[0].toLowerCase();

        switch (command) {
            case "/panic":
                messages.innerHTML = ""; 
                window.location.reload(); // Re-verrouille sur le 404
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
                // CORRECTION: Utilisation de l'API publique correcte de CoinGecko
                fetch("https://coingecko.com")
                    .then(res => {
                        if (!res.ok) throw new Error();
                        return res.json();
                    })
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

// CORRECTION: Liaison des événements pour déclencher sendMessage()
if (send) {
    send.addEventListener("click", sendMessage);
}
if (message) {
    message.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}
