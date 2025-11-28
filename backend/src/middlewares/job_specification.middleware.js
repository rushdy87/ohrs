import JobSpecification from '../models/job-specification.model.js';
import AppError from '../utils/app-error.js';

export const loadJobSpecification = async (req, res, next) => {
  const { id } = req.params;

  const jobSpecification = await JobSpecification.findByPk(id);

  if (!jobSpecification) {
    return next(new AppError(`Job specification with id ${id} not found`, 404));
  }

  req.jobSpecification = jobSpecification; // save for controller
  next();
};
