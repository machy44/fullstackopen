const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
  },
  favoriteGenre: {
    type: String,
    required: true,
    minLength: 3,
  },
});
module.exports = mongoose.model('User', schema);
