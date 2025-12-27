import { Router } from 'express';
import {
  validateIdParam,
  validateBodyWithZod,
} from '../middlewares/validate.middleware.js';
import { load } from '../middlewares/load.middleware.js';
import { Evaluation } from '../models/index.js';

import * as EvaluationControllers from '../controllers/evaluation.controllers.js';
import {
  createEvaluationSchema,
  updateEvaluationSchema,
} from '../validation/evaluation.schema.js';

const router = Router();

router
  .route('/')
  .get(EvaluationControllers.getEvaluations)
  .post(
    validateBodyWithZod(createEvaluationSchema),
    EvaluationControllers.createEvaluation
  );

router
  .route('/:id')
  .all(validateIdParam, load(Evaluation, 'evaluation')) // applies to GET/PATCH/DELETE
  .get(EvaluationControllers.getEvaluationById)
  .patch(
    validateBodyWithZod(updateEvaluationSchema),
    EvaluationControllers.updateEvaluation
  );

export default router;
