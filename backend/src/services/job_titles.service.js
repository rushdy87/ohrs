import JobTitle from '../models/job-title.model.js';

export const getAllJobTitlesService = async () => {
  return await JobTitle.findAll();
};

export const createJobTitleService = async (data) => {
  return await JobTitle.create(data);
};

export const updateJobTitleService = async (jobTitle, data) => {
  return await jobTitle.update(data);
};

export const deleteJobTitleService = async (jobTitle) => {
  return await jobTitle.destroy();
};
