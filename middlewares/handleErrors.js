const { SERVER_ERROR_CODE, SERVER_ERROR_TEXT } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message: errorMessage } = err;
  const message = statusCode === SERVER_ERROR_CODE
    ? SERVER_ERROR_TEXT
    : errorMessage;
  res
    .status(statusCode)
    .send({ message });
  next();
};
