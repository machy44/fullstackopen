import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { MONGODB_URI } from './utils/config';
import { info, error as errorLogger } from './utils/logger';
import express from 'express';
import http from 'http';

import jwt, { JwtPayload as BaseJwtPayload } from 'jsonwebtoken';
import { User } from './models/user';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

const JWT_SECRET = process.env['SECRET'] ?? '';

info('connecting to', MONGODB_URI);

interface JwtPayload extends BaseJwtPayload {
  id: string;
}

mongoose
  .connect(String(MONGODB_URI))
  .then(() => {
    info('connected to MongoDB');
  })
  .catch((error) => {
    errorLogger('error connecting to MongoDB:', error.message);
  });

// this is how you start with Apollo server
// const server = new ApolloServer({
//   typeDefs, // graphql scheme
//   resolvers, // defined queries
//   context: async ({ req }) => {
//     const auth = req ? req.headers.authorization : null;
//     if (auth && auth.toLowerCase().startsWith('bearer ')) {
//       const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET) as JwtPayload;
//       const currentUser = await User.findById(decodedToken.id).populate('friends');
//       return { currentUser };
//     }
//   },
// });

// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });

// this is how you start with apollo-server-express

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET) as JwtPayload;
        const currentUser = await User.findById(decodedToken.id).populate('friends');
        return { currentUser };
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: '/',
  });

  const PORT = 4000;

  httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`));
};

start();
