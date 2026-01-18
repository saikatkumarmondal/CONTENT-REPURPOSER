import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" }, // allow all origins for dev
});

io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", msg); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = 3001; // use a different port than Next.js dev server
httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.io server running on http://localhost:${PORT}`);
});
