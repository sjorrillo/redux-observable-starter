import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';

import { buildSchema } from './common/utilities/schema';
import { authorizationHandler } from './middlewares/authotization-handler';
import { errorHandler } from './middlewares/error-handler';
import { notFoundHandler } from './middlewares/not-found-handler';
import { addRequestHeaders } from './middlewares/request-handler';
import apiRouter from './routes/api';
import indexRouter from './routes/index';

const server = new ApolloServer({
  schema: buildSchema(),
});

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3500' }));

app.use(express.urlencoded({ extended: false, limit: '10000mb' }));
app.use(express.json({ limit: '10000mb' }));
app.use(express.static(path.join(__dirname, './public')));
app.use(cookieParser());
app.disable('x-powered-by');

const openPaths = ['/api/auth/login'];

app.use(authorizationHandler(openPaths));
app.use(addRequestHeaders());

app.use(compression());

server.applyMiddleware({ app });

app.use('/', indexRouter);
app.use('/api', apiRouter);

// Fallback route not found handler
app.use('*', notFoundHandler());

// Fallback error handler
app.use(errorHandler());

export const graphqlPath = server.graphqlPath;

export default app;
