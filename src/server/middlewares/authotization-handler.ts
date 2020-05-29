import jwt from 'express-jwt';

import { JWT_SECRET } from '../common/security/tokens';

const getToken = (req) => {
  if (req.headers.authorization?.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query?.token) {
    return req.query.token;
  }
  return null;
};

export const authorizationHandler = (openPaths) => (req, res, next) => {
  const jwtMiddleware = jwt({
    secret: JWT_SECRET.key,
    requestProperty: 'authUser',
    getToken,
  }).unless({
    path: openPaths,
  });

  const decryptBody = (error) => {
    if (error) {
      next(error);
      return;
    }

    next();
  };

  jwtMiddleware(req, res, decryptBody);
};
