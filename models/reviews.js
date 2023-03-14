const db = require('../db');
const utils = require('../utils');

module.exports = {
  get: (product_id, sort = 'newest', page = 1, count = 5) => {
    let queryString = `
      SELECT
        r.id AS review_id,
        r.rating,
        r.summary,
        r.recommend,
        r.response,
        r.body,
        to_char(to_timestamp(r.date / 1000) AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS:MS"Z"') AS date,
        r.reviewer_name,
        r.helpfulness,
        jsonb_agg(jsonb_build_object('id', rp.id, 'url', rp.url)) AS photos
      FROM reviews r
      LEFT JOIN reviews_photos rp ON r.id = rp.review_id
      WHERE r.product_id = ${product_id} AND r.reported = FALSE
      GROUP BY r.id
      ${utils.getSortQuery(sort)}
      LIMIT ${count}
      OFFSET ${(page - 1) * count}
    `

    return new Promise((resolve, reject) => {

      db.query(queryString)
      .then(res => {
        resolve({
          product: product_id,
          page,
          count,
          results: res.rows
        });
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  add: (data) => {
    let {product_id, rating, summary, body, recommend, name, email, photos, characteristics} = data;



  },
};

