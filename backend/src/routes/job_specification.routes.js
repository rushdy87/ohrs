import { Router } from 'express';

import {
  getAllJobSpecifications,
  getJobSpecificationById,
  createJobSpecification,
  updateJobSpecification,
  deleteJobSpecification,
} from '../controllers/job-specification.controllers.js';
import {
  validateIdParam,
  validateBodyWithZod,
} from '../middlewares/validate.middleware.js';

import { load } from '../middlewares/load.middleware.js';
import { JobSpecification } from '../models/index.js';
import { createJobSpecificationSchema } from '../validation/job-specification.schema.js';

const router = Router();

router
  .route('/')
  .get(getAllJobSpecifications)
  .post(
    validateBodyWithZod(createJobSpecificationSchema),
    createJobSpecification
  );

router
  .route('/:id')
  .all(validateIdParam, load(JobSpecification, 'jobSpecification'))
  .get(getJobSpecificationById)
  .put(updateJobSpecification)
  .delete(deleteJobSpecification);

export default router;
