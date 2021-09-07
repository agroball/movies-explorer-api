const users = require('express').Router();
const { getUserMe, updateProfile } = require('../controllers/users');
const { updateValidation } = require('../middlewares/BodyValidation');

users.get('/users/me', getUserMe);
users.patch('/users/me', updateValidation, updateProfile);

module.exports = users;
