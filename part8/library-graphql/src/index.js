const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { MONGODB_URI } = require('./utils/config');
const Book = require('./models/book');
const Author = require('./models/author');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const author = require('./models/author');

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
    addAuthor(name: String, born: Int): Author
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
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find().populate('author');
      }

      let condition = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        condition.author = { $in: [author._id] };
      }

      if (args.genre) {
        condition.genres = { $in: [args.genre] };
      }

      return await Book.find(condition).populate('author');
    },

    allAuthors: async () => {
      return await Author.find({});
    },
  },
  Author: {
    bookCount: async (root, _, context) => {
      console.log('book count');
      const books = await Book.find({});
      const count = books.reduce((acc, { author }) => {
        if (author.toString() === root._id.toString()) {
          return acc + 1;
        }
        return acc;
      }, 0);
      return count;
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

      if (author === null) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const book = new Book({ ...args, author: author._id });
      await book.save();

      console.log({ book });

      return await book.populate('author');
    },

    addAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name });
      if (author) {
        throw new UserInputError('author already exists');
      }

      author = new Author({ name: args.name, born: args.born });
      await author.save();
      return author;
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({
        name: args.name,
      });

      if (author === null) {
        throw new UserInputError('author doesnt exist');
      }

      if (args.setBornTo) {
        author.update({ born: args.setBornTo });
      }

      return author;
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
