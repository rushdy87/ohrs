import { z } from 'zod';
import { ALLOWED_SCORES } from '../constants/evaluation.constants.js';

export const createEvaluationSchema = z
  .object({
    employee_id: z.string().uuid(),
    year: z.preprocess(
      (val) => (typeof val === 'string' ? Number(val) : val),
      z.number().int().min(2020).max(new Date().getFullYear())
    ),

    month: z.preprocess(
      (val) => (typeof val === 'string' ? Number(val) : val),
      z.number().int().min(1).max(12)
    ),

    score: z
      .enum(ALLOWED_SCORES.map(String))
      .transform((val) => parseInt(val, 10)),
    comments: z.string().max(1000).optional(),
  })
  .strip();

export const updateEvaluationSchema = createEvaluationSchema.partial();
