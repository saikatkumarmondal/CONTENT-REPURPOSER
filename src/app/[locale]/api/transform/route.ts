import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { db } from '@/libs/DB'; // Adjust based on your DB export location
import { transformationSchema } from '@/models/Schema'; // Matches your database image
import { TransformSchema } from '@/validations/TransformValidation';

export async function POST(req: Request) {
  try {
    // 1. Authenticate the user session via Clerk
    const { userId } = await auth();

    // 2. Reject unauthorized requests
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized access. Please log in.' },
        { status: 401 },
      );
    }

    // 3. Parse and validate the incoming request body
    const body = await req.json();
    const validation = TransformSchema.safeParse(body);

    // 4. Return detailed errors if validation fails
    if (!validation.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // 5. Extract validated data
    const {
      originalContent,
      sourcePlatform,
      targetPlatform,
      contentType,
      customInstructions,
    } = validation.data;

    // 6. Insert record into the 'transformation' table
    const [newRecord] = await db
      .insert(transformationSchema)
      .values({
        userId, // Clerk User ID
        originalContent, //
        sourcePlatform: sourcePlatform ?? null, //
        targetPlatform, //
        contentType, //
        customInstructions: customInstructions ?? null, //
        generatedOutput: 'AI generating content...', // Placeholder for your AI service
      })
      .returning();

    // 7. Return the newly created database record
    return NextResponse.json(
      {
        message: 'Transformation saved successfully!',
        data: newRecord,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('API_TRANSFORM_ERROR:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
