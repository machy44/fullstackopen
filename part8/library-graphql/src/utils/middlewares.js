const { AuthenticationError } = require('apollo-server');
const skip = require('graphql-resolvers').skip;

const isAuthenticated = (parent, args, { currentUser }) => {
  if (!currentUser) {
    throw new AuthenticationError('not authenticated');
  }
  return skip;
};

module.exports = isAuthenticated;
