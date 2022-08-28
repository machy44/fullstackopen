const { ApolloServer, gql } = require('apollo-server');
const { MONGODB_URI } = require('./utils/config');
let { authors, books } = require('../mocked-data.js');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');

console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
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
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) return books;

      let filteredBooks = books;

      if (args.author) {
        const byAuthor = (book) => book.author === args.author;
        filteredBooks = books.filter(byAuthor);
      }

      if (args.genre) {
        const byGenre = (book) => book.genres.includes(args.genre);
        filteredBooks = filteredBooks.filter(byGenre);
      }

      return filteredBooks;
    },
    allAuthors: () => {
      return authors;
    },
  },
  Author: {
    bookCount: (root) => {
      return books.reduce((acc, { author }) => {
        if (author === root.name) {
          return acc + 1;
        }
        return acc;
      }, 0);
    },
  },
  Mutation: {
    addBook: (root, args) => {
      if (!authors.find((author) => author.name === args.author)) {
        authors = authors.concat({ id: uuid(), name: args.author });
      }
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      return book;
    },

    editAuthor: (root, args) => {
      const author = authors.find((author) => {
        return author.name === args.name;
      });

      if (author === undefined) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      );
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
