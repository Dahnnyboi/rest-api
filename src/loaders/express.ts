import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import * as passportLocal from 'passport-local';
import { Container } from 'typedi';
import cookieParser from 'cookie-parser';

import config from '../config';
import routes from '../api';

import UserModel from '../models/user';
import logger from '../utils/logger';
import UserService from '../services/user';

Container.set('userModel', UserModel);
Container.set('logger', logger);
const userInstance = Container.get(UserService);
const LocalStrategy = passportLocal.Strategy;

export default ({ app } : { app: express.Application }) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id, done) => {
    const result = await userInstance.findUserById(id);
    if (result) done(null, result);
    done(false);
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, async (username, password, done): Promise<any> => {
    const result = await userInstance.findUserByEmailAndPass(username, password);
    if (!result) return done(null, false);

    return done(null, result);
  }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(helmet());
  app.use(limiter);
  app.use(passport.initialize());
  app.use(cookieParser());

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
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
};
