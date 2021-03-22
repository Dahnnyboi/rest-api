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
    next({ message: 'User\'s name cannot be empty! ', status: 400 });
  }
  if (!password || password.length === 0) {
    logger.error('Users password cannot be empty!');
    next({ message: 'User\'s password cannot be empty! ', status: 400 });
  }
  if (!email || email.length === 0) {
    logger.error('Users email cannot be empty!');
    next({ message: 'User\'s email cannot be empty! ', status: 400 });
  }

  next();
};
