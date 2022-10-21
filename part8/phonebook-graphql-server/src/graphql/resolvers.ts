import { AuthenticationError, gql, UserInputError } from 'apollo-server';
import { v1 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';

import { Person, IPerson } from '../models/person';
import { User, IUser } from '../models/user';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

type Context = {
  currentUser: IUser;
};

const JWT_SECRET = process.env['SECRET'] ?? '';

export const resolvers = {
  Query: {
    me: (root: undefined, args: undefined, context: Context) => {
      return context.currentUser;
    },
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root: undefined, args: Pick<IPerson, 'phone'>) => {
      console.log('Person.find');
      if (!args.phone) {
        return await Person.find({}).populate('friendOf');
      }

      return await Person.find({ phone: { $exists: args.phone === 'YES' } }).populate('friendOf');
    },
    // The second parameter, args, contains the parameters of the query
    findPerson: async (root: undefined, args: Pick<IPerson, 'name'>) => {
      const person = await Person.findOne({ name: args.name }).populate('friendOf');
      return person;
    },
  },

  // The parameter root of the resolver function is the person-object,
  // so the street and the city of the address can be taken from its fields.

  Person: {
    // this is called field resolver
    address: (root: IPerson) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Mutation: {
    addPerson: async (root: undefined, args: Omit<IPerson, 'id'>, context: Context) => {
      const person = new Person({ ...args });

      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      try {
        person.friendOf = currentUser._id;
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
        pubsub.publish('PERSON_ADDED', { personAdded: person });
        return person;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
    },
    editNumber: async (root: undefined, args: Pick<IPerson, 'name' | 'phone'>) => {
      const person = await Person.findOne({ name: args.name });
      if (!person) {
        return {};
      }

      if (args.phone) {
        person.phone = args.phone;
      }

      try {
        await person.save();
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      return person;
    },
    createUser: async (root: undefined, args: Pick<IUser, 'username'>) => {
      const user = new User({ username: args.username });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root: undefined, args: Pick<IUser, 'username'> & { password: string }) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addAsFriend: async (root: undefined, args: Pick<IPerson, 'name'>, { currentUser }: Context) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const person = await Person.findOne({ name: args.name });

      if (person === null) {
        throw new UserInputError('Resource doesnt exist');
      }

      const nonFriendAlready = (person: IPerson) =>
        !currentUser.friends.map((f) => f._id.toString()).includes(person._id.toString());

      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();

      return currentUser;
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator('PERSON_ADDED'),
    },
  },
};
