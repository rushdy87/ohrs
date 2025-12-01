import BaseService from '../core/base-service.js';
import { Evaluation } from '../models/index.js';

class EvaluationService extends BaseService {}
export default new EvaluationService(Evaluation);
