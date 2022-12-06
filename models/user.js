const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized_err');
const { AUTHORIZATION_ERROR_TEXT } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
      if (validator.isEmail(value)) {
        return true;
      }
      return false;
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password').orFail(() => new UnauthorizedError(AUTHORIZATION_ERROR_TEXT));
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return Promise.reject(new UnauthorizedError(AUTHORIZATION_ERROR_TEXT));
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
