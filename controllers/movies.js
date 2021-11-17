const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const InvalidRequestError = require('../errors/InvalidRequestError');
const {
  INVALID_REQUEST_ERROR, NOT_FOUND_MOVIE, FORBIDDEN_ERROR, SUCCESS,
} = require('../utils/constans');

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new InvalidRequestError(INVALID_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_MOVIE);
      } if (req.user._id !== movie.owner._id.toString()) {
        throw new ForbiddenError(FORBIDDEN_ERROR);
      }
      Movie.findByIdAndDelete(movie)
        .then(() => res.status(200).send({ message: SUCCESS }))
        .catch((err) => {
          if (err.name === 'CastError' || err.name === 'ValidationError') {
            next(new InvalidRequestError(INVALID_REQUEST_ERROR));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new InvalidRequestError(INVALID_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};
