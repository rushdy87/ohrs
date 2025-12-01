import { Router } from 'express';

import * as EvaluationControllers from '../controllers/evaluation.controllers.js';
import { validateBodyWithZod } from '../middlewares/validate.middleware.js';
import { createEvaluationSchema } from '../validation/evaluation.schema.js';

const router = Router();

router
  .route('/')
  .post(
    validateBodyWithZod(createEvaluationSchema),
    EvaluationControllers.createEvaluation
  );

export default router;
