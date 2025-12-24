import { sql } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { counterSchema } from '@/models/Schema';
import { CounterValidation } from '@/validations/CounterValidation';


// export async function GET() {
//   return new NextResponse('Om Namah Shivaya', {
//     status: 200,
//     headers: { 'Content-Type': 'text/plain' },
//   });
// }
//


// 1. GET ALL: Fetch all records
export async function GET() {
  try {
    const allCounters = await db.select().from(counterSchema);
    return NextResponse.json(allCounters);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. POST: Create a new record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await db.insert(counterSchema).values({
      count: body.count ?? 0,
      name: body.name,
      imageUrl: body.imageUrl,
      content: body.content,
    }).returning();

    return NextResponse.json({ success: true, data: result[0] }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}