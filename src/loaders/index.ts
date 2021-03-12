import mongooseLoader from './mongoose';
import expressLoader from './express';

import logger from '../utils/logger';

export default async ({ expressApp }) => {
  await mongooseLoader();
  logger.info('Mongoose is loaded!');
  await expressLoader({ app: expressApp });
  logger.info('Express is loaded!');
};
