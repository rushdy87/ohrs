import { Router } from 'express';
import {
  validateIdParam,
  validateBodyWithZod,
} from '../middlewares/validate.middleware.js';
import { load } from '../middlewares/load.middleware.js';
import { Employee } from '../models/index.js';
import { createEmployeeSchema } from '../validation/employee.schema.js';

const router = Router();

router
  .route('/')
  .get((req, res, next) => next())
  .post(validateBodyWithZod(createEmployeeSchema), (req, res, next) => next());

router
  .route('/:id')
  .all(validateIdParam, load(Employee, 'employee')) // applies to GET/PUT/PATCH/DELETE
  .get((req, res, next) => next())
  .patch((req, res, next) => next())
  .delete((req, res, next) => next());

export default router;
