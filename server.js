const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let users = 0;

io.on("connection", (socket) => {

    users++;

    io.emit("user count", users);

    socket.broadcast.emit("chat message", {
        username: "Système",
        message: "Un utilisateur vient de rejoindre le chat",
        time: new Date().toLocaleTimeString()
    });


    socket.on("chat message", (data) => {
        io.emit("chat message", data);
    });


    socket.on("disconnect", () => {

        users--;

        io.emit("user count", users);

        io.emit("chat message", {
            username: "Système",
            message: "Un utilisateur a quitté le chat",
            time: new Date().toLocaleTimeString()
        });

    });

});


server.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});