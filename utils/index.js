const db = require('../db');

const getSortQuery = (sortString) => {
  switch (sortString) {
    case 'newest':
      return 'ORDER BY date DESC';
    case 'relevant':
      return 'ORDER BY rating DESC';
    case 'helpful':
      return 'ORDER BY helpfulness DESC';
  }
};

const addReview = (product_id, rating, summary, body, recommend, name, email) => {
  let queryString = `
    INSERT INTO reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `
  let values = [product_id, rating, summary, body, recommend, name, email];
  return new Promise((resolve, reject) => {
    db.query(queryString, values)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    });
  });
};

const addPhotos = (review_id, photos) => {

};

const addCharacteristics = (review_id, characteristic_id, value) => {

};

module.exports = { getSortQuery, addReview};