import { v4 as uuid } from 'uuid';

const X_REQUEST_ID = 'X-Request-Id';

export const addRequestHeaders = () => (req, res, next) => {
  req.reqId = req.reqId || req.get(X_REQUEST_ID) || uuid();
  res.setHeader(X_REQUEST_ID, req.reqId);

  next();
};
