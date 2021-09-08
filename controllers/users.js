// NPM
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Models
const User = require('../models/user');
// ERRORS
const AuthError = require('../errors/AuthError');
const InvalidRequestError = require('../errors/InvalidRequestError');
const MongoError = require('../errors/MongoError');
const NotFoundError = require('../errors/NotFoundError');
// JWT
const { JWT_SECRET } = require('../utils/ConfigEnv');

// контроллер создания User
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new InvalidRequestError('Переданы некорректные данные'));
      } else if (err.name === 'MongoError') {
        next(new MongoError('Пользователь с таким email уже существует'));
      }
      next(err);
    });
};

// контроллер информации о пользователе
module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// контроллер редактирования профиля
module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new InvalidRequestError('Переданы некорректные данные'));
      } else if (err.name === 'MongoError') {
        next(new MongoError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

// Контроллер логина
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', `Bearer ${token}`, {
        maxAge: 3600000,
        secure: true,
        httpOnly: true,
        sameSite: 'None',
      })
        .end();
    })
    .catch((err) => {
      if (err.name === 'Error') next(new AuthError('Необходима авторизация'));
      next(err);
    });
};

// контроллер выхода
module.exports.signOut = (req, res) => {
  res.clearCookie('jwt').end();
};
