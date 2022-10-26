import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  # type FriendOf {
  #   username: String!
  # }

  # circular relationship between Person and User is the reason why deep nesting exists
  # link: https://www.apollographql.com/blog/graphql/security/securing-your-graphql-api-from-malicious-queries/

  type Person {
    name: String!
    phone: String
    address: Address!
    friendOf: [User!]!
    # friendOf: FriendOf!
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
    addAsFriend(name: String!): User
  }
  type Subscription {
    personAdded: Person!
  }
`;
