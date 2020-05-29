import express from 'express';

import { login, logout, refreshToken, register } from '../actions';
import { setRouteDecorator } from '../middlewares/route-handler';

const router = express.Router();

setRouteDecorator(router);

router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.post('/auth/register', register);
router.post('/auth/refreshToken', refreshToken);

router.get('/auth/test', (req, res) => {
  const { reqId, authUser, user } = req as any;
  console.log('testjhsdhskdhfkshdksd', { reqId, authUser, user });

  res.json({ a: 'test ' });
});

export default router;
