import { Op } from 'sequelize';
import { normalizeArabic } from '../utils/arabic-normalize.js';

const EXCLUDE_FIELDS = ['page', 'sort', 'limit', 'fields', 'search'];

// @description: Class to handle API features like filtering for Sequelize queries
// @usage: new ApiFeatures(req.query).filter().options
// @returns: Sequelize query options object
// @example:
//   const features = new ApiFeatures(req.query).filter();
//   const items = await Model.findAll(features.options);
export default class ApiFeatures {
  constructor(queryString, defaultSort) {
    this.queryString = queryString;
    this.options = {
      where: {},
    };
    this.defaultSort = defaultSort;
  }

  // @description: Applies filtering based on query parameters
  // @example: ?employee_no[gte]=1000&job_status=active
  filter() {
    // 1) Copy all query parameters
    const queryObj = { ...this.queryString };
    // 2) Exclude special fields from filtering
    EXCLUDE_FIELDS.forEach((el) => delete queryObj[el]);

    const where = {};

    // 3) Loop through each query parameter
    Object.entries(queryObj).forEach(([key, value]) => {
      // 4) Detect advanced filter syntax (like employee_no[gte]=1000)
      const match = key.match(/^(.+)\[(gte|gt|lte|lt)\]$/);
      if (match) {
        // 4.A) Extract the field and operator
        const field = match[1];
        const op = match[2];

        // 4.B) Map operator text to Sequelize operator
        const opMap = {
          gte: Op.gte,
          gt: Op.gt,
          lte: Op.lte,
          lt: Op.lt,
        };
        // 4.C) Initialize if needed and assign the condition
        if (!where[field]) where[field] = {};
        where[field][opMap[op]] = isNaN(value) ? value : Number(value);
      } else {
        // 5) Simple equality filter
        where[key] = isNaN(value) ? value : Number(value);
      }
    });
    // 6) Save the filter to final Sequelize options
    this.options.where = where;

    return this;
  }
  // @description: Applies sorting based on query parameters
  // @example: ?sort=-employee_no,name_ar
  sort() {
    const { sort } = this.queryString;

    if (sort) {
      const sortFields = sort.split(',').map((field) => {
        if (field.startsWith('-')) {
          return [field.substring(1), 'DESC'];
        }
        return [field, 'ASC'];
      });

      this.options.order = sortFields;
    } else {
      // Default sort on employee_no
      this.options.order = this.defaultSort;
    }

    return this;
  }

  // Limit fields: ?fields=name_ar,employee_no,job_status
  limitFields() {
    const { fields } = this.queryString;

    if (fields) {
      const attrs = fields.split(',').map((f) => f.trim());
      this.options.attributes = attrs;
    }

    return this;
  }

  // Pagination: ?page=2&limit=20
  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 20;
    const offset = (page - 1) * limit;

    this.options.limit = limit;
    this.options.offset = offset;

    this.options.pagination = { page, limit, offset };

    return this;
  }

  // @description: Applies search functionality across specified text and numeric fields
  // @example: ?search=John - with textFields=['name_ar_search']
  // @example: ?search=1001 - with numericFields=['employee_no']
  // @param {Array} textFields - Array of text field names to search
  // @param {Array} numericFields - Array of numeric field names to search
  // @returns {ApiFeatures} - Returns the ApiFeatures instance for chaining
  search(textFields = [], numericFields = []) {
    const rawTerm = this.queryString.search || this.queryString.q;

    if (!rawTerm) return this;

    const term = normalizeArabic(rawTerm);

    const where = this.options.where || {};

    const orConditions = [];

    // iLike non-sensitive search for text fields
    if (textFields.length > 0) {
      for (const field of textFields) {
        orConditions.push({
          [field]: { [Op.iLike]: `%${term}%` },
        });
      }
    }

    // Exact match for numeric fields
    if (numericFields.length > 0 && !isNaN(term)) {
      const num = Number(term);
      for (const field of numericFields) {
        orConditions.push({ [field]: num });
      }
    }

    if (orConditions.length === 0) {
      return this;
    }

    // Combine with existing where conditions
    if (where[Op.or]) {
      where[Op.or] = [...where[Op.or], ...orConditions];
    } else {
      where[Op.or] = orConditions;
    }

    this.options.where = where;

    return this;
  }

  build() {
    return this.options;
  }
}
