const { Client } = require('pg');
const config = require('../config/index');

const dbConfig = {
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
};

const client = new Client(dbConfig);

client.connect((err) => {
  if (err) {
    console.error('Failed to connect to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
})

module.exports = client;