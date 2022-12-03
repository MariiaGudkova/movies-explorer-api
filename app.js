const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { apiLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const { PORT, MONGO_URL } = process.env;
const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(apiLimiter);
app.use(helmet());

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {});
