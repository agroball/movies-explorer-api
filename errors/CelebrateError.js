const validator = require('validator');
const { CelebrateError } = require('celebrate');

module.exports.urlValidation = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new CelebrateError('Неверный формат ссылки');
  }
  return value;
};
