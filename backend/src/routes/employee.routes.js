import { Router } from 'express';
import {
  validateIdParam,
  validateBodyWithZod,
} from '../middlewares/validate.middleware.js';
import { load } from '../middlewares/load.middleware.js';
import { Employee } from '../models/index.js';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from '../validation/employee.schema.js';
import {
  createEmployee,
  deleteEmployee,
  getActiveEmployees,
  getAllEmployees,
  getDeletedEmployees,
  getEmployeeById,
  updateEmployee,
} from '../controllers/employee.controllers.js';

const router = Router();

router.get('/deleted', getDeletedEmployees);
router.get('/all', getAllEmployees);

router
  .route('/')
  .get(getActiveEmployees)
  .post(validateBodyWithZod(createEmployeeSchema), createEmployee);

router
  .route('/:id')
  .all(validateIdParam, load(Employee, 'employee')) // applies to GET/patch/PATCH/DELETE
  .get(getEmployeeById)
  .patch(validateBodyWithZod(updateEmployeeSchema), updateEmployee)
  .delete(deleteEmployee);

export default router;
