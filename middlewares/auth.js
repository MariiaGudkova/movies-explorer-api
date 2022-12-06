require('dotenv').config();
const jwt = require('jsonwebtoken');
const devConfig = require('../devConfig.json');
const UnauthorizedError = require('../errors/unauthorized_err');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authorization required');
    }
    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devConfig.devSecret);
    req.user = payload;
    next();
  } catch (e) {
    next(new UnauthorizedError('Authorization required'));
  }
};
