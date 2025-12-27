// validation/job-specification.schema.js
import { z } from 'zod';

export const createJobSpecificationSchema = z
  .object({
    name_ar: z
      .string({ required_error: 'Name in Arabic is required' })
      .min(2, 'Name in Arabic must be at least 2 characters')
      .max(255, 'Name in Arabic must be at most 255 characters'),

    name_en: z
      .string({ required_error: 'Name in English is required' })
      .min(2, 'Name in English must be at least 2 characters')
      .max(255, 'Name in English must be at most 255 characters'),

    description: z
      .string()
      .max(2000, 'description must be at most 2000 characters')
      .optional(),
  })
  .strip();

/**
 * The different between .strict(), .strip(), and .passthrough() in Zod are as follows:
 *
 * .strict(): This method ensures that the object being validated contains only the keys defined in the schema. If there are any extra keys present in the object that are not defined in the schema, Zod will throw a validation error. This is useful when you want to enforce a strict shape for your data and reject any unexpected properties.
 *
 * .strip(): This method removes any keys from the object that are not defined in the schema. Instead of throwing an error for extra keys, Zod will simply ignore them and return an object that contains only the keys specified in the schema. This is useful when you want to allow extra properties but don't want them to be included in the validated outpatch.
 *
 * .passthrough(): This method allows extra keys to remain in the object without throwing an error or removing them. The validated object will include both the keys defined in the schema and any additional keys that were present in the original object. This is useful when you want to validate certain properties but still retain any extra data that may be present.
 *
 * In summary:
 * - Use .strict() to enforce an exact shape and reject any extra properties.
 * - Use .strip() to remove extra properties and return only the defined keys.
 * - Use .passthrough() to allow extra properties to remain in the validated object.
 */

export const updateJobSpecificationSchema =
  createJobSpecificationSchema.partial();
// partial makes all fields optional for updates
// .strip() is inherited, so extra fields are still removed
