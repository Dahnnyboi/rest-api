import expressJwt from 'express-jwt';
import config from '../../config';

function getTokenFromCookie(req) {
  if (req.cookies.token) return req.cookies.token;

  return null;
}

const authRequired = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'payload',
  getToken: getTokenFromCookie,
  algorithms: [config.jwtAlgorithm],
});

export default authRequired;
