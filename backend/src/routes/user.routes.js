import express from 'express';
import * as userControllers from '../controllers/user.controllers.js';
import {
  validateIdParam,
  validateBodyWithZod,
} from '../middlewares/validate.middleware.js';
import { load } from '../middlewares/load.middleware.js';
import { User } from '../models/index.js';
import { createUserSchema } from '../validation/user.schema.js';

const router = express.Router();
router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(validateBodyWithZod(createUserSchema), userControllers.createUser);

router
  .route('/:id')
  .get(validateIdParam, load(User, 'user'), userControllers.getUserById)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

export default router;
