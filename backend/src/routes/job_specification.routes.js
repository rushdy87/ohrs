import { Router } from 'express';

import {
  getAllJobSpecifications,
  getJobSpecificationById,
  createJobSpecification,
  updateJobSpecification,
  deleteJobSpecification,
} from '../controllers/job-specification.controllers.js';
import { validateIdParam } from '../middlewares/validate.middleware.js';

import { load } from '../middlewares/load.middleware.js';
import { JobSpecification } from '../models/index.js';

const router = Router();

router.route('/').get(getAllJobSpecifications).post(createJobSpecification);

router
  .route('/:id')
  .all(validateIdParam, load(JobSpecification, 'jobSpecification'))
  .get(getJobSpecificationById)
  .put(updateJobSpecification)
  .delete(deleteJobSpecification);

export default router;
