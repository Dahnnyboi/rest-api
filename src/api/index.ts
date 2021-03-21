import { Router } from 'express';
import posts from './routes/posts';
import users from './routes/users';
import auth from './routes/auth';

export default () => {
  const app = Router();
  posts(app);
  users(app);
  auth(app);

  return app;
};
