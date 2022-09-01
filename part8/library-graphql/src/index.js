const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { MONGODB_URI } = require('./utils/config');
const Book = require('./models/book');
const Author = require('./models/author');
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
    # allBooks(author: String, genre: String): [Book!]!
    allBooks: [Book!]!
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

    # editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async () => {
      return await Book.find().populate('author');
    },
    //   allBooks: (root, args) => {
    //     if (!args.author && !args.genre) return books;
    //     let filteredBooks = books;
    //     if (args.author) {
    //       const byAuthor = (book) => book.author === args.author;
    //       filteredBooks = books.filter(byAuthor);
    //     }
    //     if (args.genre) {
    //       const byGenre = (book) => book.genres.includes(args.genre);
    //       filteredBooks = filteredBooks.filter(byGenre);
    //     }
    //     return filteredBooks;
    //   },
    allAuthors: async () => {
      return await Author.find({});
    },
  },
  Author: {
    bookCount: async (root, _, context) => {
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

      console.log({ author });

      if (author === null) {
        author = new Author({ name: args.author });
        await author.save();
      }

      console.log({ author });

      const book = new Book({ ...args, author: author._id });
      await book.save();

      return book;
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

    //   editAuthor: (root, args) => {
    //     const author = authors.find((author) => {
    //       return author.name === args.name;
    //     });

    //     if (author === undefined) {
    //       return null;
    //     }

    //     const updatedAuthor = { ...author, born: args.setBornTo };
    //     authors = authors.map((author) =>
    //       author.name === args.name ? updatedAuthor : author
    //     );
    //     return updatedAuthor;
    //   },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
