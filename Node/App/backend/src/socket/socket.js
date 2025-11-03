const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const logger = require("../config/logger"); // Assuming you have a logger

const onlineUsers = new Map();

function initSocket(server, CLIENT_URL, JWT_SECRET) {
  const io = new Server(server, {
    cors: { origin: CLIENT_URL },
  });

  // JWT Authentication Middleware
  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Authentication error: No token provided."));
    }
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      socket.userId = payload.id; // Attach userId to the socket object
      next();
    } catch (err) {
      logger.error("JWT verification failed:", err.message);
      next(new Error("Authentication error: Invalid token."));
    }
  });

  io.on("connection", async (socket) => {
    try {
      const user = await User.findById(socket.userId).select("username").lean();
      if (!user) {
        logger.warn(`User not found for ID: ${socket.userId}, disconnecting socket.`);
        return socket.disconnect();
      }
      socket.username = user.username;
    } catch (error) {
       logger.error(`Error fetching user on connection: ${error.message}`);
       return socket.disconnect();
    }

    logger.info(`Socket connected: ${socket.id}, User: ${socket.username} (${socket.userId})`);

    // Manage online users
    if (onlineUsers.has(socket.userId)) {
      const oldSocketId = onlineUsers.get(socket.userId);
      io.sockets.sockets.get(oldSocketId)?.disconnect(true);
    }
    onlineUsers.set(socket.userId, socket.id);

    // --- Room and Chat Event Handlers ---

    socket.on("join_room", async ({ room }) => {
      try {
        socket.join(room);
        logger.info(`${socket.username} joined room ${room}`);

        // **NEW**: Fetch and send room history to the joining user
        const history = await Message.find({ room })
          .sort({ createdAt: "asc" })
          .populate("sender", "username");
        
        // Emit history only to the socket that just joined
        socket.emit("room_history", history);

        // Notify others in the room
        socket.to(room).emit("user_joined", {
          userId: socket.userId,
          username: socket.username,
        });
      } catch (error) {
        logger.error(`Error on join_room event for room ${room}:`, error);
      }
    });

    socket.on("leave_room", ({ room }) => {
      socket.leave(room);
      logger.info(`${socket.username} left room ${room}`);
      socket.to(room).emit("user_left", {
        userId: socket.userId,
        username: socket.username,
      });
    });

    socket.on("send_message", async ({ room, content }) => {
      if (!room || !content.trim()) return;
      try {
        const msg = new Message({
          room,
          sender: socket.userId,
          content: content.trim(),
        });
        await msg.save();
        const populatedMessage = await msg.populate("sender", "username");

        // **REFINED**: Broadcast the full populated message object
        io.to(room).emit("new_message", populatedMessage);
      } catch (error) {
        logger.error(`Error sending message in room ${room}:`, error);
      }
    });

    // **NEW**: Handle typing indicators
    socket.on("typing", ({ room, isTyping, username }) => {
      // Broadcast to everyone else in the room
      socket.to(room).emit("typing", { username, isTyping });
    });


    // --- WebRTC Signaling Event Handlers ---

    socket.on("call_user", ({ roomId, from }) => {
      socket.to(roomId).emit("incoming_call", { roomId, from: socket.id });
      logger.info(`User ${from} is calling room ${roomId}`);
    });

    socket.on("call_rejected", ({ roomId, from }) => {
      io.to(from).emit("call_rejected", { roomId });
      logger.info(`Call to ${from} in room ${roomId} was rejected`);
    });

    socket.on("webrtc-offer", ({ roomId, offer }) => {
      socket.to(roomId).emit("webrtc-offer", { offer, from: socket.id });

    });

    socket.on("webrtc-answer", ({ roomId, answer }) => {
      socket.to(roomId).emit("webrtc-answer", { answer, from: socket.id });
    });

    socket.on("webrtc-ice-candidate", ({ roomId, candidate }) => {
      socket.to(roomId).emit("webrtc-ice-candidate", { candidate, from: socket.id });
    });


    // --- Disconnect Handler ---

    socket.on("disconnect", () => {
      logger.info(`Socket disconnected: ${socket.id}, User: ${socket.username}`);
      onlineUsers.delete(socket.userId);
      // Notify rooms the user was in
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