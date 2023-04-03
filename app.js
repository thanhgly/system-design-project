require('newrelic');
const express = require('express');
const config = require('./config');
const logger = require('./middlewares/logger');
const { reviews, hello, loader }= require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(logger);

app.use('/hello', hello);
app.use('/reviews', reviews);
app.use('/loaderio-49be96a3ce5ab9e100b0adcc3aabb7e5', loader);

const server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

module.exports = { app, server };
