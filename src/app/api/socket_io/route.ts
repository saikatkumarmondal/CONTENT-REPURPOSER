import { NextRequest, NextResponse } from 'next/server';

// Handle Socket.IO connections through API routes
// This is a simplified implementation for Next.js App Router

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const transport = searchParams.get('transport');
  const eio = searchParams.get('EIO');
  const sid = searchParams.get('sid');

  // Socket.IO polling transport
  if (transport === 'polling' && eio) {
    try {
      // Handle initial handshake (no sid)
      if (!sid) {
        const sessionId = `s_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const handshakeData = {
          sid: sessionId,
          upgrades: ['websocket'],
          pingInterval: 25000,
          pingTimeout: 5000,
          maxPayload: 1000000
        };

        return new NextResponse(`0${JSON.stringify(handshakeData)}`, {
          headers: {
            'Content-Type': 'text/plain; charset=UTF-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': 'true',
          },
        });
      }

      // Handle polling with session ID
      if (sid) {
        // Return empty packet (no messages waiting)
        return new NextResponse('1:6', {
          headers: {
            'Content-Type': 'text/plain; charset=UTF-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
          },
        });
      }
    } catch (error) {
      console.error('Socket.IO polling error:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid socket request' }, { status: 400 });
}

export async function POST(request: NextRequest) {
  // Handle Socket.IO POST requests
  return new NextResponse('ok', {
    headers: {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function OPTIONS() {
  // Handle CORS preflight requests
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
