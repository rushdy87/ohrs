import BaseService from '../core/base-service.js';
import { Employee } from '../models/index.js';

class EmployeeService extends BaseService {
  async remove(instance) {
    // soft delete
    await instance.update({ is_active: false });
    return instance;
  }

  // ✅ get only deleted (inactive) employees
  async getDeleted() {
    return this.Model.findAll({
      where: { is_active: false },
    });
  }

  async getAllActive() {
    return this.Model.findAll({
      where: { is_active: true },
    });
  }
}

export default new EmployeeService(Employee);
