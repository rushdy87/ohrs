import catchAsync from '../utils/catch-async.js';
import handleSuccess from '../utils/handle-success.js';
import UserService from '../services/user.service.js';

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await UserService.getAll();
  handleSuccess(res, users);
});

export const getUserById = catchAsync(async (req, res, next) => {
  handleSuccess(res, req.user); // loaded by middleware
});

export const createUser = catchAsync(async (req, res, next) => {
  const newUser = await UserService.create(req.body);

  handleSuccess(res, newUser, 'User created', 201);
});
