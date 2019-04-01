// http is needed because express is not used
const http = require("http");
const socketio = require("socket.io");

// make http server with node
const server = http.createServer((req, res) => {
  res.end("I'm connected");
});

const io = socketio(server);

io.on("connection", (socket, req) => {
  // websocket's send changes to emit
  socket.emit("welcome", "Welcome to the websocket server!!!");
  socket.on("my other event", msg => {
    console.log(msg);
  });
});

server.listen(8000);
