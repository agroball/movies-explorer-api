const INVALID_REQUEST_ERROR = 'Переданы некорректные данные';
const NOT_FOUND_MOVIE = 'Фильм с указанным _id не найден';
const FORBIDDEN_ERROR = 'Недостаточно прав';
const MONGO_ERROR = 'Пользователь с таким email уже существует';
const UNAUTHORIZED_ERROR = 'Неправильные почта или пароль';
const NOT_FOUND_USER = 'Запрашиваемый пользователь не найден';
const SUCCESS = 'Успешно';
const AUTHORIZATION_ERROR = 'Необходима авторизация';
const EMAIL_ERROR = 'Неправильный формат почты';
const LINK_ERROR = 'Неверный формат ссылки';
const SERVER_ERROR = 'На сервере произошла ошибка';
const NOT_FOUND_ERROR = 'Ресурс не найден';
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

module.exports = {
  INVALID_REQUEST_ERROR,
  NOT_FOUND_MOVIE,
  FORBIDDEN_ERROR,
  SUCCESS,
  MONGO_ERROR,
  UNAUTHORIZED_ERROR,
  NOT_FOUND_USER,
  AUTHORIZATION_ERROR,
  EMAIL_ERROR,
  LINK_ERROR,
  SERVER_ERROR,
  NOT_FOUND_ERROR,
  corsOptions,
};
