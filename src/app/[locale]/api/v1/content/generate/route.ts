import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getIO } from '@/libs/socketServer';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { socketId, targetPlatform, originalContent, contentType, customInstructions } = body;

    // Get mock IO instance (won't actually send real-time updates)
    const io = getIO();

    // Mock status updates - in a real implementation these would be sent via WebSocket
    const emitStatus = (status: string) => {
      if (io && socketId) {
        io.to(socketId).emit('generate-status', status);
        console.warn(`📡 Would emit to ${socketId}: ${status}`);
      }
    };

    console.warn('🔄 Starting content generation...');
    emitStatus('Initializing AI connection...');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a content transformation assistant that helps convert content between different social media platforms.' },
        {
          role: 'user',
          content: `Transform this content for ${targetPlatform} as a ${contentType}:\n\n${originalContent}\n\n${customInstructions ? `Additional instructions: ${customInstructions}` : ''}`,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const generatedText = completion.choices[0]?.message?.content?.trim() ?? '';

    emitStatus('Finalizing output...');
    console.warn('✅ Content generation completed');
    emitStatus('Generation completed ✅');

    return NextResponse.json({
      generatedOutput: generatedText,
      usage: completion.usage,
    });
  } catch (error: any) {
    console.error('GENERATE_ROUTE_ERROR:', error);

    // Mock error status emission
    try {
      const body = await req.json().catch(() => ({}));
      const { socketId } = body;
      const io = getIO();
      if (io && socketId) {
        io.to(socketId).emit('generate-status', 'Error occurred during generation');
        console.warn(`📡 Would emit error to ${socketId}`);
      }
    } catch (emitError) {
      console.error('Failed to emit error status:', emitError);
    }

    return NextResponse.json(
      { message: error.message || 'Internal Error' },
      { status: 500 },
    );
  }
}
