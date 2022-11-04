const graphQLRequest = require('./utils');
const app = require('../app');
const queries = require('./queries');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/config');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('../resolvers');
const typeDefs = require('../schema');

const http = require('http');

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({
  schema,
  context: {},
});

const createTestEnv = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message);
    });
};

describe('e2e tests resolvers', () => {
  beforeAll(async () => {
    const httpServer = http.createServer(app);
    createTestEnv();
    await server.start();
    server.applyMiddleware({
      app,
      path: '/',
    });

    httpServer.listen(4000, () =>
      console.log(`Server is now running on http://localhost:${4000}`)
    );
  });

  test('execute countBooks', async () => {
    const bookCount = await graphQLRequest(queries.bookCountQuery);
    console.log({ bookCount });
    expect(bookCount.body.data.bookCount).toBe(2);
  });
  test('execute countAuthors', async () => {
    const authorCount = await graphQLRequest(queries.authorCountQuery);
    expect(authorCount.body.data.authorCount).toBe(2);
  });

  describe('allAuthors resolver', () => {
    test('execute allAuthors and check bookCount', async () => {
      const authors = await graphQLRequest(queries.allAuthorsQuery);
      expect(authors.body.data.allAuthors.length).toBe(5);
      expect(authors.body.data.allAuthors[0].bookCount).toBe(2);
    });
    test('execute allAuthors and check born field', async () => {
      const authors = await graphQLRequest(queries.allAuthorsQuery);
      expect(authors.body.data.allAuthors[0].born).toBe(1952);
      expect(authors.body.data.allAuthors[3].born).toBeFalsy();
    });
  });
  describe('allBook resolver', () => {
    test('execute allBooks without param', async () => {
      const books = await graphQLRequest(queries.allBooksQuery);
      expect(books.body.data.allBooks.length).toBe(7);
    });
    test('Author field resolver should return bookCount ', async () => {
      const books = await graphQLRequest(queries.allBooksQuery);
      expect(books.body.data.allBooks[0].author.bookCount).toBeTruthy();
      expect(books.body.data.allBooks[0].author.bookCount).toBe(2);
    });
    test('execute allBooks with author arg', async () => {
      const queryDostoevsky = queries.booksQueryByAuthor('Fyodor Dostoevsky');
      const books = await graphQLRequest(queryDostoevsky);
      expect(books.body.data.allBooks.length).toBe(2);
      expect(books.body.data.allBooks[0].author.name).toBe('Fyodor Dostoevsky');
      expect(books.body.data.allBooks[0].author.bookCount).toBe(2);
    });

    //   test('execute allBooks with author param', async () => {});
    //   test('execute allBooks with author and genre param', async () => {});
  });
  // test('execute allBooks', async () => {
  //   const authorCount = await graphQLRequest(authorCountQuery);
  //   expect(authorCount.body.data.authorCount).toBe(1);
  // });

  afterAll(() => {
    mongoose.connection.close();
  });
});
