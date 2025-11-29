import BaseService from '../core/base-service.js';
import { Employee } from '../models/index.js';

class EmployeeService extends BaseService {
  async remove(instance) {
    // soft delete
    await instance.update({ is_active: false });
    return instance;
  }
}

export default new EmployeeService(Employee);
