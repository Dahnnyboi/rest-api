import {
  Router,
  Request,
  Response,
} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Container } from 'typedi';

import AuthService from '../../services/auth';
import logger from '../../utils/logger';
import authValidation from '../middleware/auth-validation';
import IUserRequest from '../../interfaces/IUserRequest';

const route = Router();

Container.set('jwt', jwt);
Container.set('logger', logger);
const authInstance = Container.get(AuthService);

export default (app: Router) => {
  app.use('/auth', route);

  route.post('/login', passport.authenticate('local'), async (req: IUserRequest, res: Response) => {
    if (!req.user) res.status(400).json({ message: 'Cannot find user!' });
    const { _id, name, email } = req.user;
    const token = await authInstance.createToken(_id);

    res.cookie('token', token, { httpOnly: true, secure: true });
    res.status(200).json({ user_details: { name, email } });
  });

  route.delete('/logout', authValidation, (req: Request, res: Response) => {
    res.clearCookie('token', { httpOnly: true, secure: true });
    res.status(200).json({ message: 'Succesful logout' });
  });
};
