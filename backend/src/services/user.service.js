import BaseService from '../core/base-service.js';
import { User } from '../models/index.js';

class UserService extends BaseService {}
export default new UserService(User);
