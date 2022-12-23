const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad_request_err');
const ForbiddenError = require('../errors/forbidden_err');
const NotFoundError = require('../errors/notfound_err');
const {
  INCORRECT_DATA_CREATE_MOVIE_ERROR_TEXT,
  NOT_ENOUGH_RIGHTS_TO_DELETE_TEXT,
  INVALID_ID_MOVIE_ERROR_TEXT,
  ID_NOT_FOUND_MOVIE_ERROR_TEXT,
  SUCCSSES_DELETE_MOVIE_TEXT,
} = require('../utils/constants');

const getMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movies = await Movie.find({ owner });
    res.send({ data: movies });
  } catch (e) {
    next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      country, director, duration,
      year, description, imageUrl, trailerLink,
      thumbnail, movieId, nameRU, nameEN,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image: imageUrl,
      trailerLink,
      thumbnail,
      owner: user._id,
      movieId,
      nameRU,
      nameEN,
    });
    res.send({ data: movie });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(INCORRECT_DATA_CREATE_MOVIE_ERROR_TEXT));
      return;
    }
    next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id).orFail();
    if (movie.owner.toString() === req.user._id) {
      await movie.remove();
      res.send({ message: SUCCSSES_DELETE_MOVIE_TEXT });
    }
    throw new ForbiddenError(NOT_ENOUGH_RIGHTS_TO_DELETE_TEXT);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new BadRequestError(INVALID_ID_MOVIE_ERROR_TEXT));
      return;
    }
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError(ID_NOT_FOUND_MOVIE_ERROR_TEXT));
      return;
    }
    next(e);
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
