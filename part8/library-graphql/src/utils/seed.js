const Author = require('../models/author');
const Book = require('../models/book');
// const User = require('../models/user');
const faker = require('@faker-js/faker').faker;
const mongoose = require('mongoose');
const MONGODB_URI = require('../utils/config').MONGODB_URI;
const info = require('../utils/logger').info;
const errorLogger = require('../utils/logger').error;

// console.log({ Author });
// console.log({ Book });

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

    await Promise.all(
      [...Array(2)].map(async () => {
        const author = await new Author({
          name: faker.name.fullName(),
          born: faker.date.past(),
        }).save();

        const book = await new Book({
          title: faker.name.jobTitle(),
          published: faker.date.past(),
          genres: faker.random.word(),
          author: author._id,
        }).save();

        author.books.push(book._id);
        await author.save();
      })
    );

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
