const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const ErrorsAll = require('./middlewares/Errors');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DATA_BASE, PORT } = require('./utils/ConfigEnv');

const app = express();
app.use(cors({
  origin: ['https://agroball.diplom.nomoredomains.monster',
    'http://agroball.diplom.nomoredomains.monster',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Access-Control-Allow-Credentials'],
  credentials: true,
}));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DATA_BASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
app.use(requestLogger);

app.use('/', router);
app.use(errorLogger);

app.use(errors());
app.use(ErrorsAll);

app.listen(PORT);
