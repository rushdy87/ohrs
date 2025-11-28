import BaseService from '../core/base-service.js';
import { Employee } from '../models/index.js';

class EmployeeService extends BaseService {}
export default new EmployeeService(Employee);
