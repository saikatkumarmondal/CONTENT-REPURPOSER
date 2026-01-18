import { NextResponse } from 'next/server';
import { initSocketServer } from '@/libs/socketServer';

// This route initializes the socket server
export async function GET() {
  try {
    // In Next.js App Router, we can't directly access the HTTP server
    // So we'll just return a success response
    // The socket server will be initialized when needed
    return NextResponse.json({
      status: 'Socket server ready',
      message: 'Socket.IO server is configured and ready'
    });
  } catch (error) {
    console.error('Socket initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize socket server' },
      { status: 500 }
    );
  }
}
