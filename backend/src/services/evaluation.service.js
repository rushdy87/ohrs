// services/evaluation.service.js
import BaseService from '../core/base-service.js';
import { Evaluation } from '../models/index.js';

class EvaluationService extends BaseService {
  constructor() {
    super(Evaluation);
  }

  /**
   * Get evaluations with filters and ApiFeatures
   * @param {Object} query -
   *   supports: employee_id, year, month, and other ApiFeatures query params
   * @returns {Promise<Object>} - paginated evaluations data
   */
  async getEvaluations(query = {}) {
    const extraWhere = {};

    if (query.employee_id) {
      extraWhere.employee_id = query.employee_id;
    }

    if (query.year) {
      extraWhere.year = parseInt(query.year, 10);
    }

    if (query.month) {
      extraWhere.month = parseInt(query.month, 10);
    }

    return super.getAll(query, extraWhere, {
      defaultSort: [
        ['year', 'DESC'],
        ['month', 'DESC'],
        ['createdAt', 'DESC'],
      ],
      include: [
        {
          association: 'employee',
          attributes: [],
          where: { is_active: true },
          required: true,
        },
      ],
      //TODO: enable search if needed
      // searchTextFields: [],
      // searchNumericFields: [],
    });
  }
}

export default new EvaluationService();
