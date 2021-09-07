const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
    const authorization = req.cookies.jwt;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(AUTHORIZATION_ERROR));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthError(AUTHORIZATION_ERROR));
  }
  req.user = payload;
  return next();
};