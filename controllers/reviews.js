const { reviews } = require('../models');

module.exports = {
  get: (req, res) => {
    let {product_id, sort, page, count} = req.query;

    if (isNaN(product_id)) {
      res.status(422).send('Error: invalid product_id provided');
      return;
    }

    reviews.get(product_id, sort, page, count)
    .then(reviews => {
      res.json(reviews);
    })
    .catch(err => {
      console.error(err.stack);
      res.sendStatus(501);
    });
  },

};