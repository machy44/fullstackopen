const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const BOOK_ADDED = 'BOOK_ADDED';

const JWT_SECRET = process.env['SECRET'];

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        if (!args.author && !args.genre) {
          return await Book.find().populate('author');
        }

        let condition = {};
        if (args.author) {
          const author = await Author.findOne({ name: args.author });
          condition.author = author._id;
        }

        if (args.genre) {
          condition.genres = args.genre;
        }

        return await Book.find(condition).populate('author');
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

    allAuthors: async () => {
      return await Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
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
    createUser: async (root, args) => {
      // Our current code does not contain any error handling
      // or input validation for verifying that the username and password are in the desired format.
      const saltRounds = 10;
      const password = await bcrypt.hash(args.password, saltRounds);
      const existingUser = await User.findOne({ username: args.username });
      if (existingUser) {
        throw new UserInputError('username must be unique');
      }
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        password,
      });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user) {
        throw new UserInputError('wrong credentials');
      }
      const checkPassword = await bcrypt.compare(args.password, user.password);
      if (!checkPassword) {
        throw new UserInputError('wrong credentials');
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, JWT_SECRET, { expiresIn: 60 * 60 }),
      };
    },

    addBook: async (root, args, { currentUser }) => {
      try {
        if (!currentUser) {
          throw new AuthenticationError('not authenticated');
        }

        let author = await Author.findOne({ name: args.author });

        if (author === null) {
          author = new Author({ name: args.author });
          await author.save();
        }

        console.log({ author });

        const book = new Book({ ...args, author: author._id });
        await book.save();

        const populatedBook = await book.populate('author');

        pubsub.publish(BOOK_ADDED, { bookAdded: populatedBook });

        return await populatedBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

    addAuthor: async (root, args, { currentUser }) => {
      try {
        if (!currentUser) {
          throw new AuthenticationError('not authenticated');
        }

        let author = await Author.findOne({ name: args.name });
        if (author) {
          throw new UserInputError('author already exists');
        }

        author = new Author({ name: args.name, born: args.born });
        await author.save();
        return author;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const author = await Author.findOne({
        name: args.name,
      });

      if (author === null) {
        throw new UserInputError('author doesnt exist');
      }

      if (args.setBornTo) {
        await author.updateOne({ born: args.setBornTo });
      }

      return author;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(BOOK_ADDED),
    },
  },
};

module.exports = resolvers;
