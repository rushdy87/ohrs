import catchAsync from '../utils/catch-async.js';
import handleSuccess from '../utils/handle-success.js';
import EvaluationService from '../services/evaluation.service.js';

// TODO: Add Create Evaluations for many employees at once

// @desc    Get evaluations (with optional filters)
// @route   GET /api/v1/evaluations
// @access  Private
export const getEvaluations = catchAsync(async (req, res, next) => {
  const result = await EvaluationService.getEvaluations(req.query);

  // result = { data, total, page, limit } from BaseService.getAll
  handleSuccess(res, result, 'Evaluations retrieved successfully');
});

// @desc    Get single evaluation
// @route   GET /api/v1/evaluations/:id
// @access  Private
export const getEvaluationById = catchAsync(async (req, res, next) => {
  handleSuccess(res, req.evaluation); // loaded by middleware
});

// @desc    Create a new evaluation
// @route   POST /api/v1/evaluations
// @access  Private
export const createEvaluation = catchAsync(async (req, res, next) => {
  const evaluator_id = req.user.id; // from protect middleware
  const evaluationData = { ...req.body, evaluator_id };

  const evaluation = await EvaluationService.create(evaluationData);

  handleSuccess(res, evaluation, 'Evaluation created successfully', 201);
});

// @desc    Update an evaluation
// @route   patch /api/v1/evaluations/:id
// @access  Private

export const updateEvaluation = catchAsync(async (req, res, next) => {
  const updatedEvaluation = await EvaluationService.update(
    req.evaluation,
    req.body
  );

  handleSuccess(res, updatedEvaluation, 'Evaluation updated successfully');
});
