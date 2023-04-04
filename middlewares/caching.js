const cache = require('../cache');

module.exports = (req, res, next) => {
  if (req.method !== 'GET') {
    next();
    return;
  }

  const key = req.url;
  cache.get(key)
  .then(response => {
    if (response) {
      res.send(JSON.parse(response));
    } else {
      next();
    }
  })
  .catch(err => {
    console.error(err.stack);
  });
};