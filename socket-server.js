const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS for your Next.js app
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com"
      : "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  path: '/api/socket_io'
});

// Store connected clients
const connectedClients = new Map();

io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
  connectedClients.set(socket.id, socket);

  // Handle content generation events
  socket.on('start-generation', (data) => {
    console.log('🚀 Starting generation for:', socket.id, data);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
    connectedClients.delete(socket.id);
  });

  // Send welcome message
  socket.emit('connected', { message: 'Connected to Socket.IO server' });
});

// HTTP endpoint to emit events to specific sockets
app.post('/emit', (req, res) => {
  const { socketId, event, data } = req.body;

  if (!socketId || !event) {
    return res.status(400).json({ error: 'socketId and event are required' });
  }

  const socket = connectedClients.get(socketId);
  if (socket) {
    socket.emit(event, data);
    console.log(`📡 HTTP emit ${event} to ${socketId}:`, data);
    res.json({ success: true });
  } else {
    console.log(`⚠️ Socket ${socketId} not found for HTTP emit`);
    res.status(404).json({ error: 'Socket not found' });
  }
});

// Function to emit to specific client (used by your API routes)
global.emitToClient = (socketId, event, data) => {
  const socket = connectedClients.get(socketId);
  if (socket) {
    socket.emit(event, data);
    console.log(`📡 Emitted ${event} to ${socketId}`);
  } else {
    console.log(`⚠️ Socket ${socketId} not found`);
  }
};

const PORT = process.env.SOCKET_PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
  console.log(`📡 Socket path: /api/socket_io`);
});
