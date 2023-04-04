const { createClient } = require('redis');
const config = require('../config');

const client = createClient({
  // socket: {
  //   host: config.cache.host,
  //   port: config.cache.port
  // }
});

(async () => {
  client.on('error', err => console.error('Redis Client Error', err));
  client.connect();
})();

module.exports = client;