const db = require('../db/index');

module.exports = {
  get: (product_id) => {
    let queryString = `
      SELECT
        jsonb_build_object(
          'product_id', r.product_id,
          'ratings', (
            SELECT jsonb_object_agg(rating, count)
            FROM (
              SELECT rating, count(rating) AS count
              FROM reviews
              WHERE product_id = r.product_id
              GROUP BY rating
            ) AS rating_counts
          ),
          'recommended', (
            SELECT jsonb_object_agg(recommend, count)
            FROM (
              SELECT recommend, count(recommend) AS count
              FROM reviews
              WHERE product_id = r.product_id
              GROUP BY recommend
            ) AS recommend_counts
          ),
          'characteristics', (
            SELECT jsonb_object_agg(c.name, jsonb_build_object('id', c.id, 'value', cr.value))
            FROM characteristics c
            JOIN characteristic_reviews cr ON c.id = cr.characteristic_id
            WHERE c.product_id = r.product_id
          )
        )
      FROM reviews r
      WHERE r.product_id = ${product_id}
      GROUP BY r.product_id
    `;
    return new Promise((resolve, reject) => {
      db.query(queryString)
      .then(res => {
        if (res.rows[0]) {
          resolve(res.rows[0].jsonb_build_object);
        } else {
          resolve(
            {
              product_id,
              ratings: {},
              recommended: {},
              characteristics: {}
            }
          );
        }
      })
      .catch(err => {
        console.error(err.stack);
        reject(err);
      });
    });
  },
};