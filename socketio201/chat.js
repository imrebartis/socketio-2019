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
  socket.join("level1"); // join the level1 room
  io.of("/").to("level1").emit("joined", `${socket.id} says I have joined the level 1 room`); // namespace (here io) sending message to a room
});

io.of("/admin").on("connect", socket => {
  console.log("Someone connected to the admin namespace.");
  io.of("/admin").emit("welcome", "Welcome to the admin channel!");
});
