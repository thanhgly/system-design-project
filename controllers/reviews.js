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

    reviews.add(data)
    .then(() => {
      res.status(201).send('Created');
    })
    .catch(err => {
      console.error(err.stack);
      res.status(500).send('An error occurred. If this error persists, contact your instruction team.');
    });
  },

  markHelpful: (req, res) => {
    let review_id = req.params.review_id;

    if (isNaN(review_id)) {
      res.status(422).send('Error: invalid review id provided');
      return;
    }

    reviews.markHelpful(review_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log(err.stack);
      res.status(500).send('An error occurred. If this error persists, contact your instruction team.');
    });
  }
};