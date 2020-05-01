import { makeExecutableSchema } from 'apollo-server-express';
import fs from 'fs';
import glob from 'glob';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

export const buildSchema = () => {
  const pathToModules = path.join(__dirname, '../../modules');
  const graphqlTypes = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map(filePath => fs.readFileSync(filePath, { encoding: 'utf8' }));

  const resolvers = glob
    .sync(`${pathToModules}/**/*-resolver.ts`)
    .map(filePath => require(filePath).resolvers);

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers) as any,
  });
};
