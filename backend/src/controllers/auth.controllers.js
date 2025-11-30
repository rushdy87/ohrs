import { User } from '../models/index.js';
import catchAsync from '../utils/catch-async.js';
import handleSuccess from '../utils/handle-success.js';
import AppError from '../core/app-error.js';
import { signToken } from '../utils/token.util.js';

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError('Please provide username and password', 400));
  }

  const user = await User.findOne({
    where: {
      username,
      is_active: true,
    },
  });

  if (!user) {
    return next(new AppError('Invalid username or password', 401));
  }

  const isValid = await user.validatePassword(password);
  if (!isValid) {
    return next(new AppError('Invalid username or password', 401));
  }

  const token = signToken(user);

  const safeUser = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    unit_id: user.unit_id,
    is_active: user.is_active,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  handleSuccess(res, { user: safeUser, token });
});

export const logout = (req, res) => {
  handleSuccess(res, null, 'Logged out successfully');
};
