const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZATION_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOTFOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const SERVER_ERROR_CODE = 500;

const INCORRECT_DATA_CREATE_USER_ERROR_TEXT = 'Incorrect data was transmitted when creating a user';
const INCORRECT_DATA_UPDATE_USER_ERROR_TEXT = 'Incorrect data was transmitted when updating the profile';
const EMAIL_EXIST_ERROR_TEXT = 'A user with this email already exists';
const INVALID_ID_USER_ERROR_TEXT = 'Invalid user _id passed';
const ID_NOT_FOUND_USER_ERROR_TEXT = 'The user by the specified _id was not found';
const INCORRECT_DATA_CREATE_MOVIE_ERROR_TEXT = 'Incorrect data was transmitted when creating the movie';
const NOT_ENOUGH_RIGHTS_TO_DELETE_TEXT = 'Insufficient rights to delete the card';
const INVALID_ID_MOVIE_ERROR_TEXT = 'Invalid movie _id was passed';
const ID_NOT_FOUND_MOVIE_ERROR_TEXT = 'Movie with the specified _id was not found';
const SUCCSSES_DELETE_MOVIE_TEXT = 'Movie deleted';
const AUTHORIZATION_ERROR_TEXT = 'Incorrect email or password';
const WRONG_PATH_ERROR_TEXT = 'Wrong path passed';
const SERVER_ERROR_TEXT = 'Server error';

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZATION_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  SERVER_ERROR_CODE,
  INCORRECT_DATA_CREATE_USER_ERROR_TEXT,
  INCORRECT_DATA_UPDATE_USER_ERROR_TEXT,
  EMAIL_EXIST_ERROR_TEXT,
  INVALID_ID_USER_ERROR_TEXT,
  ID_NOT_FOUND_USER_ERROR_TEXT,
  INCORRECT_DATA_CREATE_MOVIE_ERROR_TEXT,
  NOT_ENOUGH_RIGHTS_TO_DELETE_TEXT,
  INVALID_ID_MOVIE_ERROR_TEXT,
  ID_NOT_FOUND_MOVIE_ERROR_TEXT,
  SUCCSSES_DELETE_MOVIE_TEXT,
  AUTHORIZATION_ERROR_TEXT,
  WRONG_PATH_ERROR_TEXT,
  SERVER_ERROR_TEXT,
};
