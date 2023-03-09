const express = require('express');
const config = require('./config');
const logger = require('./middlewares/logger');
const { reviews, hello }= require('./routes');

const app = express();

app.use(logger);

app.use('/hello', hello);
app.use('/reviews', reviews);

const server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

module.exports = { app, server };
