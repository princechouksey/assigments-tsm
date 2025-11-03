const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Socket.IO setup
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", { id: socket.id, message: msg });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => console.log("Server running at http://localhost:3000"));
