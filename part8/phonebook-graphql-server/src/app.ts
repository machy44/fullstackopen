import { gql, UserInputError } from 'apollo-server';
import { v1 as uuid } from 'uuid';
import { personsData, IPerson } from './data';
import { Person } from './models/person';

interface Address {
  street: string;
  city: string;
}

let persons = [...personsData];

interface PersonGraphQlScheme extends Omit<IPerson, 'street' | 'city'> {
  address: Address;
}

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
  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    # Value for the field id is not given as a parameter. Generating an id is better left for the server.
    addPerson(name: String!, phone: String, street: String!, city: String!): Person
    editNumber(name: String!, phone: String!): Person
  }
`;

export const resolvers = {
  Query: {
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
      return person.save();
    },
    editNumber: async (root: undefined, args: Pick<IPerson, 'name' | 'phone'>) => {
      const person = await Person.findOne({ name: args.name });
      if (!person) {
        return {};
      }

      if (args.phone) {
        person.phone = args.phone;
      }

      return person.save();
    },
  },
};
