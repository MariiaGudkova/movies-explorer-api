require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const devConfig = require('../devConfig.json');
const User = require('../models/user');
const BadRequestError = require('../errors/bad_request_err');
const ConflictError = require('../errors/conflict_err');
const NotFoundError = require('../errors/notfound_err');
const {
  INCORRECT_DATA_CREATE_USER_ERROR_TEXT,
  INCORRECT_DATA_UPDATE_USER_ERROR_TEXT,
  EMAIL_EXIST_ERROR_TEXT,
  INVALID_ID_ERROR_TEXT,
  ID_NOT_FOUND_ERROR_TEXT,
  SUCCSSES_UPDATE_USER_TEXT,
} = require('../utils/constants');

const registerUser = async (req, res, next) => {
  try {
    const {
      email, password, name,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: hash, name,
    });
    const { password: p, ...data } = JSON.parse(JSON.stringify(user));
    const { NODE_ENV, JWT_SECRET } = process.env;
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : devConfig.devSecret, { expiresIn: '7d' });
    res.send({ data, token });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(INCORRECT_DATA_CREATE_USER_ERROR_TEXT));
      return;
    }
    if (e.code === 11000) {
      next(new ConflictError(EMAIL_EXIST_ERROR_TEXT));
      return;
    }
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : devConfig.devSecret, { expiresIn: '7d' });
    res.send({ token });
  } catch (e) {
    next(e);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    res.send({ data: user });
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new BadRequestError(INVALID_ID_ERROR_TEXT));
      return;
    }
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError(ID_NOT_FOUND_ERROR_TEXT));
      return;
    }
    next(e);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { email, name }, {
      new: true,
      runValidators: true,
    }).orFail();
    res.send({ data: user, message: SUCCSSES_UPDATE_USER_TEXT });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError || e instanceof mongoose.Error.CastError) {
      next(new BadRequestError(INCORRECT_DATA_UPDATE_USER_ERROR_TEXT));
      return;
    }
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError(ID_NOT_FOUND_ERROR_TEXT));
      return;
    }
    if (e.code === 11000) {
      next(new ConflictError(EMAIL_EXIST_ERROR_TEXT));
      return;
    }
    next(e);
  }
};

module.exports = {
  registerUser, loginUser, getUserInfo, updateUserInfo,
};
