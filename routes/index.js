const router = require('express').Router();
const Auth = require('../middlewares/Auth');
const movie = require('./users');
const user = require('./movies');
// Controllers
const { createUser, login, signOut } = require('../controllers/users');
// Validation
const { registerValidation, authValidation } = require('../middlewares/Validation');
// ERRORS
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', registerValidation, createUser);
router.post('/signin', authValidation, login);
router.post('/signout', Auth, signOut);

router.use(Auth, user);
router.use(Auth, movie);
router.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});
module.exports = router;
