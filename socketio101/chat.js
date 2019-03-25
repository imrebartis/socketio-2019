const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8000);
const io = socketio(expressServer);
io.on("connection", socket => {
  socket.emit("messageFromServer", { data: "welcome to the socketio server" });
  socket.on("dataToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });
});
