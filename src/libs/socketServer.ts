// Real Socket.IO client for Next.js App Router
// Connects to external Socket.IO server

class RealSocketIO {
  private socketServerUrl: string;

  constructor() {
    // Connect to the Socket.IO server running on port 3001
    this.socketServerUrl = process.env.NODE_ENV === 'production'
      ? process.env.SOCKET_SERVER_URL || 'https://your-socket-server.com'
      : 'http://localhost:3001';
  }

  // Method to emit to specific socket via HTTP request to socket server
  async emitToSocket(socketId: string, event: string, data: any) {
    try {
      const response = await fetch(`${this.socketServerUrl}/emit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          socketId,
          event,
          data
        })
      });

      if (response.ok) {
        console.warn(`📡 Emitted ${event} to ${socketId}`);
      } else {
        console.warn(`⚠️ Failed to emit ${event} to ${socketId}`);
      }
    } catch (error) {
      console.error('Socket emit error:', error);
    }
  }

  // Mock the 'to' method for targeting specific sockets
  to(socketId: string) {
    return {
      emit: (event: string, data: any) => {
        // Send via HTTP to the socket server
        this.emitToSocket(socketId, event, data);
      }
    };
  }

  // Mock emit for broadcasting (not implemented for simplicity)
  emit(event: string, data: any) {
    console.warn(`📡 Broadcast ${event} not implemented:`, data);
  }
}

// Global IO instance
let ioInstance: RealSocketIO | null = null;

export const initSocketServer = () => {
  if (!ioInstance) {
    ioInstance = new RealSocketIO();
    console.warn('🔌 Connected to Socket.IO server');
  }
  return ioInstance;
};

export const getIO = (): RealSocketIO => {
  if (!ioInstance) {
    ioInstance = new RealSocketIO();
  }
  return ioInstance;
};

export const getSocketServer = () => ioInstance;
