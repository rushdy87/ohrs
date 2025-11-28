// validation/job-specification.schema.js
import { z } from 'zod';

export const createJobTitleSchema = z
  .object({
    title: z
      .string({ required_error: 'Title in Arabic is required' })
      .min(2, 'Title in Arabic must be at least 2 characters')
      .max(255, 'Title in Arabic must be at most 255 characters'),

    grade: z
      .number({ required_error: 'Grade is required' })
      .int('Grade must be an integer')
      .min(1, 'Grade must be at least 1')
      .max(10, 'Grade must be at most 10'),

    notes: z
      .string()
      .max(1000, 'Notes must be at most 1000 characters')
      .optional(),
  })
  .strip();

/**
 * The different between .strict(), .strip(), and .passthrough() in Zod are as follows:
 *
 * .strict(): This method ensures that the object being validated contains only the keys defined in the schema. If there are any extra keys present in the object that are not defined in the schema, Zod will throw a validation error. This is useful when you want to enforce a strict shape for your data and reject any unexpected properties.
 *
 * .strip(): This method removes any keys from the object that are not defined in the schema. Instead of throwing an error for extra keys, Zod will simply ignore them and return an object that contains only the keys specified in the schema. This is useful when you want to allow extra properties but don't want them to be included in the validated output.
 *
 * .passthrough(): This method allows extra keys to remain in the object without throwing an error or removing them. The validated object will include both the keys defined in the schema and any additional keys that were present in the original object. This is useful when you want to validate certain properties but still retain any extra data that may be present.
 *
 * In summary:
 * - Use .strict() to enforce an exact shape and reject any extra properties.
 * - Use .strip() to remove extra properties and return only the defined keys.
 * - Use .passthrough() to allow extra properties to remain in the validated object.
 */
