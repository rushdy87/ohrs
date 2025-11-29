import BaseService from '../core/base-service.js';
import { JobTitle } from '../models/index.js';

class JobTitleService extends BaseService {
  async create(data) {
    const payload = { ...data };

    if (payload.title) {
      // Add any normalization or processing for Arabic text if needed
      payload.title_search = payload.title; // Placeholder for actual normalization
    }

    return this.Model.create(payload);
  }
  async update(instance, data) {
    const payload = { ...data };

    if (payload.title) {
      // Add any normalization or processing for Arabic text if needed
      payload.title_search = payload.title; // Placeholder for actual normalization
    }

    return instance.update(payload);
  }
}
export default new JobTitleService(JobTitle);
