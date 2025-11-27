import Unit from '../models/unit.model.js';
import AppError from '../utils/app-error.js';

export const loadUnit = async (req, res, next) => {
  const { id } = req.params;

  const unit = await Unit.findByPk(id);

  if (!unit) {
    return next(new AppError(`Unit with id ${id} not found`, 404));
  }

  req.unit = unit; // save for controller
  next();
};
