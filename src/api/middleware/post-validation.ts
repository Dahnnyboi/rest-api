import {
  Request,
  Response,
  NextFunction,
} from 'express';

import logger from '../../utils/logger';

export default (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;

  if (!title || title.length === 0) {
    logger.error('Post\'s title cannot be empty!');
    next({ message: 'Post\'s title cannot be empty!', status: 400 });
  }

  if (!description || description.length === 0) {
    logger.error('Post\'s description cannot be empty!');
    next({ message: 'Post\'s description cannot be empty!', status: 400 });
  }

  next();
};
