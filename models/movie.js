const mongoose = require('mongoose');
const { LINK_ERROR } = require('../utils/constans');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(url) {
        return /(https?):\/\/\S{2,}\.\S{2,}/.test(url);
      },
      message: LINK_ERROR,
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator(url) {
        return /(https?):\/\/\S{2,}\.\S{2,}/.test(url);
      },
      message: LINK_ERROR,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(url) {
        return /(https?):\/\/\S{2,}\.\S{2,}/.test(url);
      },
      message: LINK_ERROR,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
