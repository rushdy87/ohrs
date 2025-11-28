import AppError from '../core/app-error.js';
import catchAsync from '../utils/catch-async.js';

export const load = (model, alias = 'document') =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const record = await model.findByPk(id);

    if (!record) {
      return next(new AppError(`${model.name} with id ${id} not found`, 404));
    }

    req[alias] = record; // save for controller
    next();
  });
