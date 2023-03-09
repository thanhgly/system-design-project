const { reviews } = require('../models');

module.exports = {
  get: (req, res) => {
    let {product_id, sort, page, count} = req.query;

    if (Number(product_id) === NaN || !product_id) {
      res.status(422).send('Error: invalid product_id provided');
      return;
    }

    reviews.getReviews(product_id, sort, page, count)
    .then(reviews => {
      res.json(reviews).end();
    })
    .catch(err => {
      console.error(err.stack);
      res.sendStatus(501);
    });
  },

};