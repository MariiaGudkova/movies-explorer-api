const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { apiLimiter } = require('./utils/rateLimiter');
require('dotenv').config();

const { PORT = 5000, MONGO_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;
const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(apiLimiter);
app.use(helmet());

app.listen(PORT, () => {});
