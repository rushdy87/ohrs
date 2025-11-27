import { Router } from 'express';
import {
  getAllUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
} from '../controllers/units.controllers.js';

import { validateIdParam } from '../middlewares/validate-id.middleware.js';
import { loadUnit } from '../middlewares/unit.middleware.js';

const router = Router();

router.route('/').get(getAllUnits).post(createUnit);

router
  .route('/:id')
  .all(validateIdParam, loadUnit) // applies to GET/PUT/PATCH/DELETE
  .get(getUnitById)
  .patch(updateUnit)
  .delete(deleteUnit);

export default router;
