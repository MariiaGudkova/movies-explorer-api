const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { addMovieValidation, deleteMovieValidation } = require('../middlewares/joiValidation');

router.get('/', getMovies);

router.post('/', addMovieValidation(), createMovie);

router.delete('/:_id', deleteMovieValidation(), deleteMovie);

module.exports = router;
