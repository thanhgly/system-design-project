const express = require('express');
const config = require('./config');
const logger = require('./middlewares/logger');
const hello = require('./routes/hello');

const app = express();

app.use(logger);

app.use('/hello', hello);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

module.exports = { app };



