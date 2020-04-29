import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import path from 'path';

import { buildSchema } from './common/utilities/schema';
import apiRouter from './routes/api';
import indexRouter from './routes/index';

const server = new ApolloServer({
  schema: buildSchema(),
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

server.applyMiddleware({ app });

app.use('/', indexRouter);
app.use('/api', apiRouter);

export const graphqlPath = server.graphqlPath;

export default app;
