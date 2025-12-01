import AppError from '../core/app-error.js';
import catchAsync from '../utils/catch-async.js';
import handleSuccess from '../utils/handle-success.js';
import EvaluationService from '../services/evaluation.service.js';

export const createEvaluation = catchAsync(async (req, res, next) => {
  const evaluator_id = req.user.id;
  const evaluationData = { ...req.body, evaluator_id };
  const evaluation = await EvaluationService.create(evaluationData);

  handleSuccess(res, evaluation, 'Evaluation created successfully', 201);
});
