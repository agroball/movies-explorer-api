const mongoose = require('mongoose');
const validator = require('validator');
const { incorrectImageLinc, incorrectTrailerLinc, incorrectThumbnailLinc } = require('../utils/db');

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
    required: true,
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
      message: incorrectImageLinc,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(trailer) {
        return validator.isURL(trailer);
      },
      message: incorrectTrailerLinc,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(thumbnail) {
        return validator.isURL(thumbnail);
      },
      message: incorrectThumbnailLinc,
    },
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
