const db = require('./index');
const { getSortQuery } = require('../utils');

db.getReviews = (product_id, sort = 'newest', page = 1, count = 5) => {
  const offset = (page - 1) * count; // skip a number of row based on count and count per page
  const sortQuery = getSortQuery(sort); // get a query string based on sort argument
  const values = [product_id, count, offset];
  const queryString = `
    SELECT *
    FROM reviews
    WHERE product_id = $1
    AND reported = false
    ${sortQuery}
    LIMIT $2
    OFFSET $3
  `;
  return db.query(queryString, values);
};

db.getReviewPhotos = (review_id) => {
  const queryString = `
    SELECT id, url
    FROM reviews_photos
    WHERE review_id = ${review_id}
  `;
  return db.query(queryString);
};

module.exports = db;