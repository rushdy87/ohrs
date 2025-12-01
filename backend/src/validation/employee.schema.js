import { z } from 'zod';

// Enums as Zod schemas
const genderEnum = z.enum(['ذكر', 'أنثى']);

const jobRoleEnum = z.enum(['مهندس', 'فني', 'عامل', 'مكتبي']);

const jobStatusEnum = z.enum(['ملاك', 'عقد', 'أجر يومي', 'عقد محافظة']);

const shiftGroupEnum = z.enum(['A', 'B', 'C', 'D', 'صباحي']);

const degreeEnum = z.enum([
  'دكتوراه',
  'ماجستير',
  'دبلوم عالي',
  'بكلوريوس',
  'دبلوم',
  'إعدادية',
  'متوسطة',
  'ابتدائية',
  'يقرأ ويكتب',
]);

const ppeSizeEnum = z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']);

const safetyShoesSizeEnum = z.enum([
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
]);

const remunerationGroupEnum = z.enum(['first', 'second', 'both']);

// بسيط لفحص تاريخ بصيغة YYYY-MM-DD
const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be in YYYY-MM-DD format');

// 🧾 createEmployeeSchema
export const createEmployeeSchema = z
  .object({
    // الاسم العربي - مطلوب
    name_ar: z
      .string({ required_error: 'name_ar is required' })
      .min(1, 'name_ar cannot be empty')
      .max(255, 'name_ar must be at most 255 characters'),

    // الاسم الإنجليزي - اختياري
    name_en: z.string().max(255).optional(),

    // رقم الموظف - مطلوب - رقم صحيح موجب
    employee_no: z.coerce
      .number({ required_error: 'employee_no is required' })
      .int('employee_no must be an integer')
      .min(1, 'employee_no must be >= 1'),

    // الجنس - ENUM مع default "ذكر"
    gender: genderEnum.default('ذكر'),

    // الهاتف - اختياري
    phone: z.string().max(50).optional(),

    // الإيميل - اختياري + تحقق isEmail
    email: z.string().email().optional(),

    // العنوان - اختياري
    address: z.string().max(255).optional(),

    // الدور الوظيفي (مهندس / فني / عامل / مكتبي) - اختياري
    job_role: jobRoleEnum.optional(),

    // الحالة الوظيفية - مطلوب
    job_status: jobStatusEnum,

    // موقع العمل - اختياري
    job_location: z.string().max(255).optional(),

    // مجموعة الوجبة - ENUM مع default "صباحي"
    shift_group: shiftGroupEnum.default('صباحي'),

    // الدرجة العلمية - اختياري
    degree: degreeEnum.optional(),

    // اختصاص الدرجة - اختياري
    degree_specialization: z.string().max(255).optional(),

    // تاريخ الميلاد - اختياري بصيغة YYYY-MM-DD
    birth_date: dateString.optional(),

    // حالة الإعارة - boolean مع default false
    loaning_status: z.coerce.boolean().default(false),

    // جهة الإعارة - اختياري
    loaning_from: z.string().max(255).optional(),

    // حجم معدات الوقاية
    ppe_size: ppeSizeEnum.optional(),

    // حجم حذاء السلامة
    safety_shoes_size: safetyShoesSizeEnum.optional(),

    // تاريخ التعيين - اختياري، لو لم يُرسل نترك الـ DB يعطي default NOW
    employee_date_of_hire: dateString.optional(),

    // مجموعة المكافأة
    remuneration_group: remunerationGroupEnum.optional(),

    // الحالة الفعلية للموظف - boolean مع default true
    is_active: z.coerce.boolean().default(true),

    // ملاحظات - اختياري
    notes: z.string().optional(),

    // Foreign Keys as UUID strings (اختيارية)
    unit_id: z.string().uuid().optional(),
    job_title_id: z.string().uuid().optional(),
    job_specification_id: z.string().uuid().optional(),
  })
  .strip(); // تحذف أي حقول غير معرّفة في الـ schema

export const updateEmployeeSchema = createEmployeeSchema.partial();
// partial makes all fields optional for updates
// .strip() is inherited, so extra fields are still removed
