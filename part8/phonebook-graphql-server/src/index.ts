import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import { MONGODB_URI } from './utils/config';
import { info, error as errorLogger } from './utils/logger';
import { typeDefs, resolvers } from './app';

info('connecting to', MONGODB_URI);

mongoose
  .connect(String(MONGODB_URI))
  .then(() => {
    info('connected to MongoDB');
  })
  .catch((error) => {
    errorLogger('error connecting to MongoDB:', error.message);
  });

const server = new ApolloServer({
  typeDefs, // graphql scheme
  resolvers, // defined queries
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
