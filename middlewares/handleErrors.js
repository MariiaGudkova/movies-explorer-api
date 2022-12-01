const { SERVER_ERROR_CODE } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message: errorMessage } = err;
  const message = statusCode === SERVER_ERROR_CODE
    ? 'An error occurred on the server'
    : errorMessage;
  res
    .status(statusCode)
    .send({ message });
  next();
};
