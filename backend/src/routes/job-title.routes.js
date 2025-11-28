import { Router } from 'express';

import {
  getAllJobTitles,
  getJobTitleById,
  createJobTitle,
  updateJobTitle,
  deleteJobTitle,
} from '../controllers/job_title.controllers.js';
import { validateIdParam } from '../middlewares/validate.middleware.js';
import { load } from '../middlewares/load.middleware.js';
import { JobTitle } from '../models/index.js';

const router = Router();

router.route('/').get(getAllJobTitles).post(createJobTitle);

router
  .route('/:id')
  .all(validateIdParam, load(JobTitle, 'jobTitle'))
  .get(getJobTitleById)
  .put(updateJobTitle)
  .delete(deleteJobTitle);

export default router;
