const router = require('express').Router();
const {
  signUpValidation, signInValidation,
} = require('../middlewares/joiValidation');
const {
  registerUser, loginUser,
} = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notfound_err');
const { WRONG_PATH_ERROR_TEXT } = require('../utils/constants');

router.post('/signup', signUpValidation(), registerUser);

router.post('/signin', signInValidation(), loginUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError(WRONG_PATH_ERROR_TEXT));
});

module.exports = router;
