import { Router } from 'express';
import {
  validateIdParam,
  validateBodyWithZod,
} from '../middlewares/validate.middleware.js';
import { load } from '../middlewares/load.middleware.js';

const passthrough = (req, res, next) => next();

const instantiateController = (controller, controllerArgs = []) => {
  if (!controller) {
    throw new Error('A controller or controller class must be provided');
  }

  if (typeof controller === 'function') {
    return new controller(...controllerArgs);
  }

  if (typeof controller === 'object') {
    return controller;
  }

  throw new Error(
    'Controller must be either a class or an object with handler methods'
  );
};

const bindControllerMethod = (instance, methodName) => {
  if (!instance || typeof instance[methodName] !== 'function') {
    throw new Error(`Controller must implement ${methodName}()`);
  }

  return instance[methodName].bind(instance);
};

const getBodyValidator = (schema) =>
  schema ? validateBodyWithZod(schema) : passthrough;

export const createCrudRouter = ({
  Model,
  resourceKey,
  controller,
  controllerArgs = [],
  createSchema,
  updateSchema,
}) => {
  const router = Router();
  const controllerInstance = instantiateController(controller, controllerArgs);
  const validateCreateBody = getBodyValidator(createSchema);
  const validateUpdateBody = getBodyValidator(updateSchema);

  router
    .route('/')
    .get(bindControllerMethod(controllerInstance, 'getAll'))
    .post(
      validateCreateBody,
      bindControllerMethod(controllerInstance, 'create')
    );

  router
    .route('/:id')
    .all(validateIdParam, load(Model, resourceKey))
    .get(bindControllerMethod(controllerInstance, 'getById'))
    .patch(
      validateUpdateBody,
      bindControllerMethod(controllerInstance, 'update')
    )
    .delete(bindControllerMethod(controllerInstance, 'remove'));

  return router;
};
