import { z } from 'zod';

export const createUserSchema = z
  .object({
    username: z
      .string({ required_error: 'username is required' })
      .min(3, 'username must be at least 3 characters long')
      .max(30, 'username must be 30 characters or less'),

    password: z
      .string({ required_error: 'password is required' })
      .min(4, 'password must be at least 4 characters long')
      .max(100, 'password must be 100 characters or less'),

    name: z
      .string({ required_error: 'name is required' })
      .min(1, 'name cannot be empty')
      .max(100, 'name must be 100 characters or less'),

    // نفس الـ ENUM في الـ model
    role: z.enum(['root', 'manager', 'admin', 'supervisor', 'user']).optional(),

    // متوافق مع الـ model: INTEGER
    unit_id: z.string().uuid().optional(),

    is_active: z.boolean().optional(),
  })
  .strip();

export const updateUserSchema = createUserSchema.partial();
