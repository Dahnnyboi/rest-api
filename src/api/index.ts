import { Router } from 'express';
import post from './routes/posts';

export default () => {
  const app = Router();
  post(app);

  return app;
};
