import Unit from '../models/unit.model.js';

const getAllUnits = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'units',
  });
};

const getUnitById = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: `unit with id ${req.params.id}`,
  });
};

const createUnit = async (req, res) => {
  res.status(201).json({
    status: 'success',
    data: 'new unit created',
  });
};

const updateUnit = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: `unit with id ${req.params.id} updated`,
  });
};

const deleteUnit = async (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

export default { getAllUnits, getUnitById, createUnit, updateUnit, deleteUnit };
