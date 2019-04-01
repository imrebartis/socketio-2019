const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8000);
const io = socketio(expressServer);
io.on("connection", socket => {
  socket.emit("messageFromServer", { data: "welcome to the socketio server" });
  socket.on("dataToServer", dataFromClient => {
    console.log(dataFromClient);
  });
  socket.on("newMessageToServer", msg => {
    io.emit("messageToClients", { text: msg.text });
  });

  setTimeout(() => {
    io.of("/admin").emit("welcome", "Welcome to the admin channel, from the main channel!");
  }, 2000);
});

io.of("/admin").on("connect", socket => {
  console.log("Someone connected to the admin namespace.");
  io.of("/admin").emit("welcome", "Welcome to the admin channel!");
});
