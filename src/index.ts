import 'reflect-metadata';

import express from 'express';

import loaders from './loaders';
import config from './config';
import logger from './utils/logger';

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(config.port, () => {
    logger.info(`Server is running at port ${config.port}`);
  });
}

startServer();
