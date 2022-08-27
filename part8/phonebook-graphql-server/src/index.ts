import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import { MONGODB_URI } from './utils/config';
import { info, error as errorLogger } from './utils/logger';
import { typeDefs, resolvers } from './app';
import jwt, { JwtPayload as BaseJwtPayload } from 'jsonwebtoken';
import { User } from './models/user';

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

const server = new ApolloServer({
  typeDefs, // graphql scheme
  resolvers, // defined queries
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET) as JwtPayload;
      const currentUser = await User.findById(decodedToken.id).populate('friends');
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
