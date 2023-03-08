const db = require('../db/queries');
const { conformReview } = require('../utils');

module.exports = {
  getReviews: (product_id, sort, page, count) => {
    return db.getReviews(product_id, sort, page, count)
    .then(res => {
      return res.rows;
    })
    .then(reviews => {
      return Promise.all(reviews.map(review => {
        let review_id = review.id;
        return db.getReviewPhotos(review_id)
        .then(res => {
          return conformReview(review, res.rows);
        });
      }));
    })
    .then(reviews => {
      return {
        product: product_id,
        page: page || 1,
        count: count || 5,
        results: reviews
      };
    })
    .catch(err => {
      console.error(err.stack);
    });
  },

};

