const { metadata } = require('../models');

module.exports = {
  get: (req, res) => {
    let { product_id } = req.query;

    metadata.get(product_id)
    .then(response => res.json(response))
    .catch(err => {
      console.error(err.stack);
      res.sendStatus(501);
    });
  },
};