import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import { TransformSchema } from '@/validations/TransformValidation';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    // 1. Authenticate
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized access.' }, { status: 401 });
    }

    // 2. Validate Request
    const body = await req.json();
    const validation = TransformSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { originalContent, targetPlatform, contentType, customInstructions }
      = validation.data;

    // 3. AI Generation Logic
    const prompt = `
You are a professional content repurposing assistant.

Task: Transform the following content from its original form to be suitable for ${targetPlatform} as a ${contentType} post.

Requirements:
- Preserve the core message and key information.
- Adjust tone, style, and length to match ${targetPlatform}'s audience.
- Follow any custom instructions: ${customInstructions ?? 'None'}.
- Format the output as a ready-to-post content (include hashtags, mentions, or emojis if appropriate).
- Avoid copying the original word-for-word; make it natural and engaging.

Original Content:
${originalContent}

Provide only the transformed content in your response.
`;

    // ✅ FIXED OPENAI CALL (NEW SDK)
    const completion = await openai.chat.completions.create({
      model: 'gpt-5-nano', // fast + cheap
      messages: [
        { role: 'system', content: 'You are a content transformation assistant.' },
        { role: 'user', content: prompt },
      ],

    });

    const generatedText = completion.choices[0]?.message?.content ?? '';

    // ✅ FULL LOG (you already saw this working)
    console.warn('OpenAI Full Response:', completion);

    return NextResponse.json(
      {
        message: 'Content generated and saved!',
        generatedOutput: generatedText,
         usage: completion.usage, // token + cost tracking
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('API_GENERATE_ERROR:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
