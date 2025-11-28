import { Router } from 'express';

import {
  getAllJobSpecifications,
  getJobSpecificationById,
  createJobSpecification,
  updateJobSpecification,
  deleteJobSpecification,
} from '../controllers/job-specification.controllers.js';
import { validateIdParam } from '../middlewares/validate-id.middleware.js';
import { loadJobSpecification } from '../middlewares/job_specification.middleware.js';

const router = Router();

router.route('/').get(getAllJobSpecifications).post(createJobSpecification);

router
  .route('/:id')
  .all(validateIdParam, loadJobSpecification)
  .get(getJobSpecificationById)
  .put(updateJobSpecification)
  .delete(deleteJobSpecification);

export default router;
