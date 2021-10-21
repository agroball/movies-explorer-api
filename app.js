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
const { limiter } = require('./middlewares/limiter');
const { corsOptions } = require('./utils/constans');

const app = express();
app.use(cors(corsOptions));
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

app.use(limiter);
app.use('/', router);
app.use(errorLogger);

app.use(errors());
app.use(ErrorsAll);

app.listen(PORT);
