const router = require('express').Router();
const auth = require('../middlewares/auth');
const user = require('./users');
const movie = require('./movies');
const { createUser, login, signOut } = require('../controllers/users');
const { registerValidation, authValidation } = require('../middlewares/bodyValidation');
const { NOT_FOUND_ERROR } = require('../utils/constans');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', registerValidation, createUser);
router.post('/signin', authValidation, login);
router.post('/signout', auth, signOut);

router.use(auth, user);
router.use(auth, movie);
router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR));
});
module.exports = router;
