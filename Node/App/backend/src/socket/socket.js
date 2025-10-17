const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const onlineUsers = new Map();

function initSocket(server, CLIENT_URL, JWT_SECRET) {
  const io = new Server(server, {
    cors: { origin: CLIENT_URL },
  });

  // JWT Authentication
  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error"));
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      socket.userId = payload.id;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", async (socket) => {
    // Manage online users
    if (onlineUsers.has(socket.userId)) {
      const oldSocketId = onlineUsers.get(socket.userId);
      io.sockets.sockets.get(oldSocketId)?.disconnect(true);
    }
    onlineUsers.set(socket.userId, socket.id);

    const user = await User.findById(socket.userId).select("username");
    if (user) socket.username = user.username;

    console.log("Socket connected:", socket.id, "User:", socket.userId);

    // Join room
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`${socket.username} joined room ${roomId}`);
      io.to(roomId).emit("user_joined", {
        userId: socket.userId,
        username: socket.username,
      });
    });

    // Leave room
    socket.on("leave_room", (roomId) => {
      socket.leave(roomId);
      io.to(roomId).emit("user_left", {
        userId: socket.userId,
        username: socket.username,
      });
    });

    // Chat messages
    socket.on("send_message", async ({ room, content }) => {
      if (!room || !content.trim()) return;
      const msg = await Message.create({
        room,
        sender: socket.userId,
        content: content.trim(),
      });
      const populated = await msg.populate("sender", "username");
      io.to(room).emit("new_message", {
        id: populated._id,
        room: populated.room,
        sender: {
          id: populated.sender._id,
          username: populated.sender.username,
        },
        content: populated.content,
        createdAt: populated.createdAt,
      });
    });

    socket.on("call_user", ({ roomId, from }) => {
      // Notify all other users in the room about an incoming call
      socket.to(roomId).emit("incoming_call", { roomId, from: socket.id });
      console.log(`User ${from} is calling room ${roomId}`);
    });

    socket.on("call_rejected", ({ roomId, from }) => {
      // Notify the caller that their call was rejected
      io.to(from).emit("call_rejected", { roomId });
      console.log(`Call to ${from} in room ${roomId} was rejected`);
    });

    // ---------- WebRTC signaling ----------
    socket.on("webrtc-offer", ({ roomId, offer }) => {
      socket.to(roomId).emit("webrtc-offer", { offer, from: socket.id });
    });

    socket.on("webrtc-answer", ({ roomId, answer }) => {
      socket.to(roomId).emit("webrtc-answer", { answer, from: socket.id });
    });

    socket.on("webrtc-ice-candidate", ({ roomId, candidate }) => {
      socket
        .to(roomId)
        .emit("webrtc-ice-candidate", { candidate, from: socket.id });
    });
    

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
      onlineUsers.delete(socket.userId);
      // Notify all rooms
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          io.to(room).emit("user_left", {
            userId: socket.userId,
            username: socket.username,
          });
        }
      });
    });
  });

  return io;
}

module.exports = { initSocket };  

