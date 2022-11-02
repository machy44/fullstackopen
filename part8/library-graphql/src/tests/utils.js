const app = require('../index');
const supertest = require('supertest');

const graphQLRequest = (query) => {
  return supertest(app).post('/').send({
    query,
  });
};

module.exports = graphQLRequest;
