import BaseService from '../core/base-service.js';
import { Employee } from '../models/index.js';
import { normalizeArabic } from '../utils/arabic-normalize.js';

class EmployeeService extends BaseService {
  async remove(instance) {
    // soft delete
    await instance.update({ is_active: false });
    return instance;
  }

  async create(data) {
    const payload = { ...data };

    if (payload.name_ar) {
      payload.name_ar_search = normalizeArabic(payload.name_ar);
    }

    return this.Model.create(payload);
  }

  async update(instance, data) {
    const payload = { ...data };

    if (payload.name_ar) {
      payload.name_ar_search = normalizeArabic(payload.name_ar);
    }

    return instance.update(payload);
  }
}

export default new EmployeeService(Employee);
