/* eslint-disable no-undef */
const db = require('../db/queries');

afterAll(() => {
  db.end();
});

describe('getReviews', () => {

  it('should return an array of reviews for a given product', (done) => {
    const product_id = 1;
    db.getReviews(product_id)
    .then(res => {
      let result = res.rows;
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('rating');
      expect(result[0]).toHaveProperty('summary');
      expect(result[0]).toHaveProperty('recommend');
      expect(result[0]).toHaveProperty('response');
      expect(result[0]).toHaveProperty('body');
      expect(result[0]).toHaveProperty('date');
      expect(result[0]).toHaveProperty('reviewer_name');
      expect(result[0]).toHaveProperty('helpfulness');
      done();
    })
    .catch(err => {
      console.error(err.stack);
    });
  });

  it('should return an empty array for non-existent product', (done) => {
    const product_id = 5774953;
    db.getReviews(product_id)
    .then(res => {
      let result = res.rows;
      expect(result).toEqual([]);
      done();
    })
    .catch(err => {
      console.error(err.stack);
    });
  });
});

describe('getReviewPhotos', () => {
  it('should return an array of photos for a given review', (done) => {
    const review_id = 9;
    db.getReviewPhotos(review_id)
    .then(res => {
      let result = res.rows;
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty('url');
      expect(result[0]).toHaveProperty('id');
      done();
    })
    .catch(err => {
      console.error(err.stack);
    });
  });

  it('should return an empty array for non-existent review', (done) => {
    const review_id = 9999999;
    db.getReviewPhotos(review_id)
    .then(res => {
      let result = res.rows;
      expect(result).toEqual([]);
      done();
    })
    .catch(err => {
      console.error(err.stack);
    });
  });
});
