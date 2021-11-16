const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser, signOut } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}),
login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}),
createUser);
router.post('/signout', signOut);

module.exports = router;
