const graphQLRequest = require('./utils');
const app = require('../app');
const queries = require('./queries');
const mutations = require('./mutations');
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
  context: () => {
    return {
      currentUser: {
        username: 'test',
        favoriteGenre: 'punk',
      },
    };
  },
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
  describe('query resolvers', () => {
    test('execute countBooks', async () => {
      const bookCount = await graphQLRequest(queries.bookCountQuery);
      expect(bookCount.body.data.bookCount).toBe(7);
    });
    test('execute countAuthors', async () => {
      const authorCount = await graphQLRequest(queries.authorCountQuery);
      expect(authorCount.body.data.authorCount).toBe(5);
    });

    test('me resolver', async () => {
      const user = await graphQLRequest(queries.meQuery);
      expect(user.body.data.me.username).toBe('test');
      expect(user.body.data.me.favoriteGenre).toBe('punk');
    });

    describe('allAuthors resolver', () => {
      test('execute allAuthors and check bookCount', async () => {
        const authors = await graphQLRequest(queries.allAuthorsQuery);
        expect(authors.body.data.allAuthors.length).toBe(5);
        expect(authors.body.data.allAuthors[0].bookCount).toBe(2);
      });
      test('execute allAuthors and check born field', async () => {
        const authors = await graphQLRequest(queries.allAuthorsQuery);
        console.log(authors.body.data.allAuthors[0]);
        expect(authors.body.data.allAuthors[0].born).toBe(1952);
        expect(authors.body.data.allAuthors[3].born).toBeFalsy();
      });
    });
    describe('allBook resolver', () => {
      test('execute allBooks without param', async () => {
        const books = await graphQLRequest(queries.allBooksQuery);
        expect(books.body.data.allBooks.length).toBe(7);
        expect(books.body.data.allBooks[0].genres).toBeInstanceOf(Array);
      });
      test('author field resolver should return bookCount ', async () => {
        const books = await graphQLRequest(queries.allBooksQuery);
        expect(books.body.data.allBooks[0].author.bookCount).toBeTruthy();
        expect(books.body.data.allBooks[0].author.bookCount).toBe(2);
      });
      test('execute allBooks with author arg', async () => {
        const queryDostoevsky = queries.booksQueryByAuthor('Fyodor Dostoevsky');
        const books = await graphQLRequest(queryDostoevsky);
        expect(books.body.data.allBooks.length).toBe(2);
        expect(books.body.data.allBooks[0].author.name).toBe(
          'Fyodor Dostoevsky'
        );
        expect(books.body.data.allBooks[0].author.bookCount).toBe(2);
      });
      test('execute allBooks with author and genre args', async () => {
        const queryDostoevskyGenre = queries.booksQueryByAuthorGenre(
          'Fyodor Dostoevsky',
          'crime'
        );
        const dostoevskyBooks = await graphQLRequest(queryDostoevskyGenre);
        expect(dostoevskyBooks.body.data.allBooks.length).toBe(1);
        expect(dostoevskyBooks.body.data.allBooks[0].author.name).toBe(
          'Fyodor Dostoevsky'
        );
        expect(dostoevskyBooks.body.data.allBooks[0].author.bookCount).toBe(2);
      });
    });
  });
  describe('mutation resolvers', () => {
    test('execute addBook and author already exists', async () => {
      const fowlersBook = await graphQLRequest(mutations.addBookAuthorExists);
      expect(fowlersBook.body.data.addBook.title).toBe('NoSQL Distilled');
      expect(fowlersBook.body.data.addBook.author.name).toBe('Martin Fowler');
      expect(fowlersBook.body.data.addBook.author.born).toBe(1963);
      expect(fowlersBook.body.data.addBook.author.bookCount).toBe(2);
      const books = await graphQLRequest(queries.allBooksQuery);
      expect(books.body.data.allBooks.length).toBe(8);
    });
    test('execute addBook and author doesnt exist', async () => {
      const ReijoBook = await graphQLRequest(
        mutations.addBookAuthorDoesntExist
      );
      expect(ReijoBook.body.data.addBook.title).toBe('Pimeyden tango');
      expect(ReijoBook.body.data.addBook.author.name).toBe('Reijo Mäki');
      expect(ReijoBook.body.data.addBook.author.born).toBe(null);
      expect(ReijoBook.body.data.addBook.author.bookCount).toBe(1);
      const books = await graphQLRequest(queries.allBooksQuery);
      expect(books.body.data.allBooks.length).toBe(8);
    });
    test('execute addAuthor author doesnt exist', async () => {
      const author = await graphQLRequest(
        mutations.addAuthorWithoutBorn('name surname')
      );
      expect(author.body.data.addAuthor.name).toBe('name surname');
      expect(author.body.data.addAuthor.born).toBe(null);
      expect(author.body.data.addAuthor.bookCount).toBe(0);
      // const authors = await graphQLRequest(queries.allAuthorsQuery);
      // expect(authors.body.data.allAuthors.length).toBe(6);
    });
    test('execute addAuthor without born field', async () => {
      const author = await graphQLRequest(
        mutations.addAuthorWithBorn('name surname 2', 1965)
      );
      expect(author.body.data.addAuthor.name).toBe('name surname 2');
      expect(author.body.data.addAuthor.born).toBe(1965);
      expect(author.body.data.addAuthor.bookCount).toBe(0);
      // const authors = await graphQLRequest(queries.allAuthorsQuery);
      // expect(authors.body.data.allAuthors.length).toBe(7);
    });
    test('execute addAuthor author already exists', async () => {
      const author = await graphQLRequest(
        mutations.addAuthorWithBorn('Martin Fowler', 1963)
      );
      console.log(author.body.errors);
      expect(author.body.errors[0].message).toBe('author already exists');
      expect(author.body.errors).toBeTruthy();
    });
    test('execute editAuthor', async () => {});
    test('execute editAuthor but author doesnt exist', async () => {});
  });
  afterAll(() => {
    mongoose.connection.close();
  });
});
