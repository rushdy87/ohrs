import { Router } from 'express';

import unitsController from '../controllers/units.controllers.js';

const router = Router();

router
  .route('/')
  .get(unitsController.getAllUnits)
  .post(unitsController.createUnit);

router
  .route('/:id')
  .get(unitsController.getUnitById)
  .put(unitsController.updateUnit)
  .delete(unitsController.deleteUnit);

export default router;
