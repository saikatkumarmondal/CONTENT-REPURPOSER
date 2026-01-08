import { z } from 'zod';

// This matches the fields in your transformationSchema
export const TransformSchema = z.object({
  originalContent: z
    .string()
    .min(10, { message: 'Content is too short (min 10 characters)' })
    .max(5000, { message: 'Content is too long (max 5000 characters)' }),
  sourcePlatform: z.string().optional().nullable(),
  targetPlatform: z.string().min(1, { message: 'Target platform is required' }),
  contentType: z.string().min(1, { message: 'Content type is required' }),
  customInstructions: z.string().max(500).optional().nullable(),
});

// Export the type for use in your frontend components
export type TransformInput = z.infer<typeof TransformSchema>;
