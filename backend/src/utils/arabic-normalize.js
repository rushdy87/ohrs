export function normalizeArabic(text = '') {
  if (!text) return '';

  return (
    text
      .replace(/[أإآا]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ۀ/g, 'ة')
      .replace(/ـ/g, '')
      // حذف التشكيل كاملًا
      .replace(/[\u064B-\u0652]/g, '')
      // مسافات زائدة
      .replace(/\s+/g, ' ')
      .trim()
  );
}
