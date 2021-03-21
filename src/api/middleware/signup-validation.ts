import {
  Request,
  Response,
  NextFunction,
} from 'express';
import logger from '../../utils/logger';

export default (req: Request, res: Response, next: NextFunction) => {
  const { name, password, email } = req.body;

  if (!name || name.length === 0) {
    logger.error('Users name cannot be empty!');
    res.status(400).json({ message: 'Name cannot be empty' });
  }
  if (!password || password.length === 0) {
    logger.error('Users password cannot be empty!');
    res.status(400).json({ message: 'Password cannot be empty' });
  }
  if (!email || email.length === 0) {
    logger.error('Users email cannot be empty!');
    res.status(400).json({ message: 'Password cannot be empty' });
  }

  next();
};
