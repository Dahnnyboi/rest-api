import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import config from '../config';
import routes from '../api';

export default ({ app } : { app: express.Application }) => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(helmet());
  app.use(limiter);

  app.enable('trust proxy');

  app.get('/', (req, res) => {
    res.status(200).end();
  });

  app.use(config.api.prefix, routes());

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    next(err);
  });

  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
};
