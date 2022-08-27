import { gql, UserInputError } from 'apollo-server';
import { v1 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { personsData, IPerson } from './data';
import { Person } from './models/person';
import { User, IUser } from './models/user';

const JWT_SECRET = process.env['SECRET'] ?? '';

interface Address {
  street: string;
  city: string;
}

let persons = [...personsData];

// interface PersonGraphQlScheme extends Omit<IPerson, 'street' | 'city'> {
//   address: Address;
// }

export const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }

  type Token {
    value: String!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    # Value for the field id is not given as a parameter. Generating an id is better left for the server.
    addPerson(name: String!, phone: String, street: String!, city: String!): Person
    editNumber(name: String!, phone: String!): Person
    createUser(username: String!): User
    login(username: String!, password: String!): Token
  }
`;

export const resolvers = {
  Query: {
    me: (root: undefined, args: undefined, context: { currentUser: IUser }) => {
      return context.currentUser;
    },
    personCount: async () => Person.collection.countDocuments(),
    allPersons: (root: undefined, args: Pick<IPerson, 'phone'>) => {
      if (!args.phone) {
        return Person.find({});
      }

      return Person.find({ phone: { $exists: args.phone === 'YES' } });
    },
    // The second parameter, args, contains the parameters of the query
    findPerson: (root: undefined, args: Pick<IPerson, 'name'>) => {
      Person.findOne({ name: args.name });
    },
  },
  // The parameter root of the resolver function is the person-object,
  // so the street and the city of the address can be taken from its fields.
  Person: {
    address: (root: IPerson) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Mutation: {
    addPerson: async (root: undefined, args: Omit<IPerson, 'id'>) => {
      const person = new Person({ ...args });
      try {
        person.save();
      } catch (error) {
        // @ts-ignore
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return person;
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
        person.save();
      } catch (error) {
        // @ts-ignore
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
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
  },
};
