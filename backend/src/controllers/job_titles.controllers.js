import AppError from '../utils/app-error.js';
import catchAsync from '../utils/catch-async.js';
import handleSuccess from '../utils/handle-success.js';
import JobTitleService from '../services/job_titles.service.js';

export const getAllJobTitles = catchAsync(async (req, res, next) => {
  const jobTitles = await JobTitleService.getAll();
  handleSuccess(res, jobTitles);
});

export const getJobTitleById = catchAsync(async (req, res, next) => {
  handleSuccess(res, req.jobTitle); // loaded by middleware
});

export const createJobTitle = catchAsync(async (req, res, next) => {
  const { title, grade, notes } = req.body;

  if (!title || !grade) {
    return next(new AppError('Title and grade are required', 400));
  }

  const newJobTitle = await JobTitleService.create({ title, grade, notes });

  handleSuccess(res, newJobTitle, 'Job title created', 201);
});

export const updateJobTitle = catchAsync(async (req, res, next) => {
  const { title, grade, notes } = req.body;

  if (!title && !grade && !notes) {
    return next(new AppError('No fields to update', 400));
  }

  const updatedJobTitle = await JobTitleService.update(req.jobTitle, {
    title,
    grade,
    notes,
  });

  handleSuccess(res, updatedJobTitle, 'Job title updated');
});

export const deleteJobTitle = catchAsync(async (req, res, next) => {
  await JobTitleService.remove(req.jobTitle);

  res.status(204).end();
});
