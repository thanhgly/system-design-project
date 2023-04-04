const { metadata } = require('../models');
const cache = require('../cache');

module.exports = {
  get: (req, res) => {
    let { product_id } = req.query;

    metadata.get(product_id)
    .then(response => {
      cache.set(req.url, JSON.stringify(response));
      res.json(response)
    })
    .catch(err => {
      console.error(err.stack);
      res.sendStatus(501);
    });
  },
};