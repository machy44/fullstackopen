import { ApolloServer, gql, UserInputError } from 'apollo-server';
import { v1 as uuid } from 'uuid';
import { personsData, IPerson } from './data';

interface Address {
  street: string;
  city: string;
}

let persons = [...personsData];

interface PersonGraphQlScheme extends Omit<IPerson, 'street' | 'city'> {
  address: Address;
}

const typeDefs = gql`
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

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root: undefined, args: Pick<IPerson, 'phone'>) => {
      if (!args.phone) {
        return persons;
      }
      const byPhone = (person: IPerson) => (args.phone === 'YES' ? person.phone : !person.phone);
      return persons.filter(byPhone);
    },
    // The second parameter, args, contains the parameters of the query
    findPerson: (root: undefined, args: Pick<IPerson, 'name'>) => {
      return persons.find((p) => p.name === args.name);
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
    addPerson: (root: undefined, args: Omit<IPerson, 'id'>) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        });
      }
      const person: IPerson = { ...args, id: uuid() };
      persons = persons.concat(person);
      return person;
    },
    editNumber: (root: undefined, args: Pick<IPerson, 'name' | 'phone'>) => {
      console.log({ root });
      const person = persons.find((p) => p.name === args.name);
      if (!person) {
        return null;
      }

      const updatedPerson = { ...person, phone: args.phone };
      persons = persons.map((p) => (p.name === args.name ? updatedPerson : p));
      return updatedPerson;
    },
  },
};

const server = new ApolloServer({
  typeDefs, // graphql scheme
  resolvers, // defined queries
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
