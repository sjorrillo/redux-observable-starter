import express from 'express';

import { setRouteDecorator } from '../middlewares/route-handler';

const router = express.Router();

setRouteDecorator(router);

router.get('/', (_req, res) => {
  res.render('index', { title: 'GraphQL' });
});

export default router;
