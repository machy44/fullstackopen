const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    username: String!
    password: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    # you dont give chance for deep nest queries because
    # you dont return the whole author back in response.
    # if you return Book here it would be the same problem as it exists in phonebook
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    resetDatabase: Boolean!
    seedTestDatabase: Boolean!
    addAuthor(name: String, born: Int): Author
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
