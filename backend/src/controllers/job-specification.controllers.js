import AppError from '../utils/app-error.js';
import catchAsync from '../utils/catch-async.js';
import handleSuccess from '../utils/handle-success.js';
import JobSpecificationService from '../services/job_specification.service.js';

export const getAllJobSpecifications = catchAsync(async (req, res, next) => {
  const jobSpecifications = await JobSpecificationService.getAll();
  handleSuccess(res, jobSpecifications);
});

export const getJobSpecificationById = catchAsync(async (req, res, next) => {
  handleSuccess(res, req.jobSpecification); // loaded by middleware
});

export const createJobSpecification = catchAsync(async (req, res, next) => {
  const { name_ar, name_en, description } = req.body;

  if (!name_ar || !name_en) {
    return next(new AppError('name_ar and name_en are required', 400));
  }

  const newJobSpecification = await JobSpecificationService.create({
    name_ar,
    name_en,
    description,
  });

  handleSuccess(res, newJobSpecification, 'Job Specification created', 201);
});

export const updateJobSpecification = catchAsync(async (req, res, next) => {
  const { name_ar, specification_en, description } = req.body;

  if (!name_ar && !specification_en && !description) {
    return next(new AppError('No fields to update', 400));
  }

  const updatedJobSpecification = await JobSpecificationService.update(
    req.jobSpecification,
    { name_ar, specification_en, description }
  );

  handleSuccess(res, updatedJobSpecification, 'Job Specification updated');
});

export const deleteJobSpecification = catchAsync(async (req, res, next) => {
  await JobSpecificationService.remove(req.jobSpecification);

  res.status(204).end();
});
