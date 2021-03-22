import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import { Container } from 'typedi';

import IPostRequest from '../../interfaces/IPostRequest';
import PostService from '../../services/post';
import PostModel from '../../models/post';
import logger from '../../utils/logger';

import postValidation from '../middleware/post-validation';

const route = Router();
Container.set('postModel', PostModel);
Container.set('logger', logger);
const postInstance = Container.get(PostService);

export default (app: Router) => {
  app.use('/posts', route);

  route.post('/', postValidation, async (req: IPostRequest, res: Response, next: NextFunction) => {
    const { title, description } = req.body;

    try {
      await postInstance.createPost({ title, description });
      res.status(200).json({ message: 'Successfully created a post!' });
    } catch (e) {
      logger.error(e);
      next();
    }
  });

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const post = await postInstance.getPostById(id);
      res.status(200).json({ post });
    } catch (e) {
      logger.error(e);
      next();
    }
  });

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const { offset, limit } = req.query;
    try {
      const { posts, postsCount } = await postInstance.getPosts(limit, offset);
      res.status(200).json({ posts, postsCount });
    } catch (e) {
      logger.error(e);
      next();
    }
  });

  route.put('/:id', postValidation, async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
      await postInstance.updatePostById(id, { title, description });
      res.status(200).json({ message: 'Successfully updated a post!' });
    } catch (e) {
      logger.error(e);
      next();
    }
  });

  route.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await postInstance.deletePostById(id);
      res.status(204).json({ message: 'Successfully deleted a post!' });
    } catch (e) {
      logger.error(e);
      next();
    }
  });
};
