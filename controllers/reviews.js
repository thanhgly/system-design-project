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
      res.status(500).send('An error occurred. If this error persists, contact your instruction team.');
    });
  },

  post: (req, res) => {
    let data = req.body;

    for (let key in data) {
      if (key === 'recommend' && typeof data[key] === 'boolean') {
        continue;
      }
      if (!!data[key] === false) {
        res.status(422).send('Error: Review body contains invalid entries');
        return;
      }
    }

    reviews.add(data)
    .then(() => {
      res.send('Created');
    })
    .catch(err => {
      console.error(err.stack);
      res.status(500).send('An error occurred. If this error persists, contact your instruction team.');
    });
  }
};