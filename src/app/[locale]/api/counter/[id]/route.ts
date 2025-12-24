import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { counterSchema } from '@/models/Schema';
import { CounterValidation } from '@/validations/CounterValidation';

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const json = await request.json();
    const { id } = await params;
    const targetId = Number(id);

    // 1. Debug: See what is coming in from Postman
    console.log('Incoming Request Body:', json);

    // 2. Validate the data
    const parse = CounterValidation.safeParse(json);

    if (!parse.success) {
      // 3. Debug: See exactly why Zod is unhappy
      console.log('Validation Failed:', JSON.stringify(parse.error.format(), null, 2));
      return NextResponse.json(parse.error.format(), { status: 422 });
    }

    // 4. Update the record
    const updatedRecord = await db
      .update(counterSchema)
      .set({
        // Use the validated increment number (1, 2, or 3)
        count: sql`${counterSchema.count} + ${parse.data.increment}`,

        // Update the other fields from the json body
        name: json.name,
        imageUrl: json.imageUrl,
        content: json.content,
        updatedAt: new Date(),
      })
      .where(eq(counterSchema.id, targetId))
      .returning();

    if (updatedRecord.length === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    console.log(`Counter ${targetId} updated successfully. Increment: ${parse.data.increment}`);

    return NextResponse.json({
      success: true,
      data: updatedRecord[0],
    });
  } catch (error: any) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
// 3. DELETE (Remove by ID)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.log(`Deleting ID: ${id}`);

    const deleted = await db
      .delete(counterSchema)
      .where(eq(counterSchema.id, Number(id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: 'ID not found in database' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `ID ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// 1. GET ONE (Find by ID)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await db.select().from(counterSchema).where(eq(counterSchema.id, Number(id)));

  if (result.length === 0) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  return NextResponse.json(result[0]);
}
