import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import { Container } from 'typedi';

import UserService from '../../services/user';
import UserModel from '../../models/user';
import logger from '../../utils/logger';
import signupValidation from '../middleware/signup-validation';
import authValidation from '../middleware/auth-validation';

const route = Router();
Container.set('userModel', UserModel);
Container.set('logger', logger);
const userInstance = Container.get(UserService);

export default (app: Router) => {
  app.use('/users', route);

  route.post('/signup', signupValidation, async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email } = req.body;

    try {
      await userInstance.createUser(name, password, email);
      res.status(200).json({ message: 'Successfully created a user!' });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  });

  route.get('/details', authValidation, async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;

    try {
      const userDetails = await userInstance.findUserById(id);

      res.status(200).json({ user: userDetails });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  });
};
