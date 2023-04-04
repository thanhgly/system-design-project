require('newrelic');
const express = require('express');
const config = require('./config');
const logger = require('./middlewares/logger');
const cache = require('./cache');
const { reviews, hello }= require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(logger);

app.use('/hello', hello);
app.use('/reviews', reviews);

// loader.io verification
app.get('/' + config.loader.key, (req, res) => {
  res.send(config.loader.key);
});

const server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully...');
  cache.quit();
  server.close(() => {
    console.log('HTTP server closed. Exiting process...');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down gracefully...');
  cache.quit();
  server.close(() => {
    console.log('HTTP server closed. Exiting process...');
    process.exit(0);
  });
});

module.exports = { app, server };
