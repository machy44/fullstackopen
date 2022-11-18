const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');
const mongoose = require('mongoose');
const MONGODB_URI = require('../utils/config').MONGODB_URI;
const bcrypt = require('bcrypt');
const info = require('../utils/logger').info;
const errorLogger = require('../utils/logger').error;

let data = [
  {
    title: 'Clean Code',
    published: 2008,
    genres: ['refactoring'],
    author: {
      name: 'Robert Martin',
      born: 1952,
    },
  },
  {
    title: 'Agile software development',
    published: 2002,
    genres: ['agile', 'patterns', 'design'],
    author: {
      name: 'Robert Martin',
      born: 1952,
    },
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    genres: ['refactoring'],
    author: {
      name: 'Martin Fowler',
      born: 1963,
    },
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    genres: ['classic', 'crime'],
    author: {
      name: 'Fyodor Dostoevsky',
      born: 1821,
    },
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    genres: ['refactoring', 'patterns'],
    author: {
      name: 'Joshua Kerievsky',
    },
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    genres: ['refactoring', 'design'],
    author: {
      name: 'Sandi Metz',
    },
  },
  {
    title: 'The Demon ',
    published: 1872,
    genres: ['classic', 'revolution'],
    author: {
      name: 'Fyodor Dostoevsky',
      born: 1821,
    },
  },
];

const seed = async () => {
  try {
    mongoose
      .connect(String(MONGODB_URI))
      .then(() => {
        info('connected to MongoDB');
      })
      .catch((error) => {
        errorLogger('error connecting to MongoDB:', error.message);
      });

    await Author.deleteMany({});
    await Book.deleteMany({});
    await User.deleteMany({});

    const saltRounds = 10;
    const password = await bcrypt.hash('test', saltRounds);

    await new User({
      username: 'test',
      password,
      favoriteGenre: 'refactoring',
    }).save();

    // use reduce to sequentally add authors/books to DB
    // https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
    await data.reduce(async (memo, bookAuthor) => {
      // I dont like this. I believe you should you bluebird
      // for this cases in the future projects
      await memo;
      let author = await Author.findOne({ name: bookAuthor.author.name });
      if (author === null) {
        author = await new Author({
          name: bookAuthor.author.name,
          born: bookAuthor.author.born,
        }).save();
      }

      const book = await new Book({
        title: bookAuthor.title,
        published: bookAuthor.published,
        genres: bookAuthor.genres,
        author: author._id,
      }).save();

      author.books.push(book._id);

      await author.save();
    }, []);

    mongoose.disconnect();
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      throw new Error(e.message);
    }
    mongoose.disconnect();
  }
};

seed();

module.exports = seed;
