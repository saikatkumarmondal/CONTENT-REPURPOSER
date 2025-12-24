import * as z from 'zod';

export const CounterValidation = z.object({
  // Keep this if you want to use it for the math
  increment: z.number().min(1).max(10).optional(),

  // Add your new fields here
  name: z.string().min(1).optional(),
  imageUrl: z.string().url().optional().or(z.string().length(0)),
  content: z.string().optional(),
});