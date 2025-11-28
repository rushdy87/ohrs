import { Router } from 'express';
import {
  getAllUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
} from '../controllers/units.controllers.js';

import {
  validateIdParam,
  validateBodyWithZod,
} from '../middlewares/validate.middleware.js';
import {
  createUnitSchema,
  updateUnitSchema,
} from '../validation/unit.schema.js';
import { load } from '../middlewares/load.middleware.js';
import { Unit } from '../models/index.js';

const router = Router();

router
  .route('/')
  .get(getAllUnits)
  .post(validateBodyWithZod(createUnitSchema), createUnit);

router
  .route('/:id')
  .all(validateIdParam, load(Unit, 'unit')) // applies to GET/PUT/PATCH/DELETE
  .get(getUnitById)
  .put(validateBodyWithZod(updateUnitSchema), updateUnit)
  .delete(deleteUnit);

export default router;
