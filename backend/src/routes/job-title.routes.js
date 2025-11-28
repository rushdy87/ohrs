import { Router } from 'express';

import {
  getAllJobTitles,
  getJobTitleById,
  createJobTitle,
  updateJobTitle,
  deleteJobTitle,
} from '../controllers/job_titles.controllers.js';
import { validateIdParam } from '../middlewares/validate-id.middleware.js';
import { loadJobTitle } from '../middlewares/job_title.middleware.js';

const router = Router();

router.route('/').get(getAllJobTitles).post(createJobTitle);

router
  .route('/:jobTitleId')
  .all(validateIdParam, loadJobTitle)
  .get(getJobTitleById)
  .put(updateJobTitle)
  .delete(deleteJobTitle);

export default router;
