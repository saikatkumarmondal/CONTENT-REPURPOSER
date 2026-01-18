# Socket.IO Server Setup

This project includes a separate Socket.IO server for real-time communication.

## Setup

### 1. Install Dependencies

The Socket.IO server requires Node.js. The dependencies are already included in package.json.

### 2. Run the Socket Server

Start the Socket.IO server on port 3001:

```bash
npm run dev:socket
```

### 3. Run Next.js App

In another terminal, start your Next.js app:

```bash
npm run dev
```

## Architecture

- **Socket Server** (`socket-server.js`): Runs on port 3001, handles WebSocket connections
- **Next.js App**: Runs on port 3000, communicates with socket server via HTTP requests
- **Real-time Updates**: Status updates during content generation

## How It Works

1. **Client Connection**: Transform page connects to Socket.IO server
2. **API Communication**: Generate route sends HTTP requests to socket server to emit events
3. **Real-time Updates**: Socket server broadcasts status updates to connected clients

## Production Deployment

For production:

1. Deploy the Socket.IO server separately (e.g., on Railway, Render, or AWS)
2. Update `SOCKET_SERVER_URL` environment variable
3. Update CORS settings in `socket-server.js`

## Environment Variables

```env
# Socket server URL (production)
SOCKET_SERVER_URL=https://your-socket-server.com

# Socket server port (development)
SOCKET_PORT=3001
```

## Troubleshooting

- **Connection Issues**: Make sure both servers are running
- **CORS Errors**: Check CORS settings in socket-server.js
- **Port Conflicts**: Ensure ports 3000 and 3001 are available
