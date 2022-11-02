const graphQLRequest = require('./utils');
const mongoose = require('mongoose');

const bookCountQuery = `query {
    bookCount
  }`;

describe('resolvers', () => {
  test('execute countBooks', async () => {
    const bookCount = await graphQLRequest(bookCountQuery);
    console.log(bookCount);
    expect(bookCount.body.data.bookCount).toBe(1);
  });
  afterAll(() => {
    mongoose.connection.close();
  });
});
