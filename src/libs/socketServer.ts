import { Server } from 'socket.io';

let io: Server | null = null;

export const initSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    path: '/socket.io',
    cors: { origin: '*' },
  });
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};
