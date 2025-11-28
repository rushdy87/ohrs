import JobTitle from '../models/job-title.model.js';
import AppError from '../utils/app-error.js';

export const loadJobTitle = async (req, res, next) => {
  const { id } = req.params;

  const jobTitle = await JobTitle.findByPk(id);

  if (!jobTitle) {
    return next(new AppError(`Job title with id ${id} not found`, 404));
  }

  req.jobTitle = jobTitle; // save for controller
  next();
};
