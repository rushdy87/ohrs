import { Router } from 'express';
import {
  getAllUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
} from '../controllers/units.controllers.js';

import { validateIdParam } from '../middlewares/validate.middleware.js';
import { load } from '../middlewares/load.middleware.js';
import { Unit } from '../models/index.js';

const router = Router();

router.route('/').get(getAllUnits).post(createUnit);

router
  .route('/:id')
  .all(validateIdParam, load(Unit, 'unit')) // applies to GET/PUT/PATCH/DELETE
  .get(getUnitById)
  .patch(updateUnit)
  .delete(deleteUnit);

export default router;
