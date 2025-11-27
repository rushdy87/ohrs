import Unit from '../models/unit.model.js';

export const getAllUnitsService = async () => {
  return await Unit.findAll();
};

export const createUnitService = async (data) => {
  return await Unit.create(data);
};

export const updateUnitService = async (unit, data) => {
  return await unit.update(data);
};

export const deleteUnitService = async (unit) => {
  return await unit.destroy();
};
