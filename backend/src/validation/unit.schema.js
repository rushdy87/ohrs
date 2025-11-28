import { z } from 'zod';

export const createUnitSchema = z
  .object({
    code: z
      .string({ required_error: 'code is required' })
      .min(1, 'code cannot be empty')
      .max(20, 'code must be 20 characters or less'),

    name: z
      .string({ required_error: 'name is required' })
      .min(1, 'name cannot be empty')
      .max(150, 'name must be 150 characters or less'),

    notes: z.string().optional(),
  })
  .strip();

export const updateUnitSchema = createUnitSchema.partial();
// partial makes all fields optional for updates
// .strip() is inherited, so extra fields are still removed
