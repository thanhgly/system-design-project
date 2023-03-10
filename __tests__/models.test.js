/* eslint-disable no-undef */
const { reviews } = require('../models');
const { metadata }= require('../models');
const db = require('../db/index');

afterAll(() => {
  db.end();
});

describe('getReviews', () => {
  it('should return the expected shape for reviews', (done) => {
    reviews.getReviews(100)
    .then(res => {
      expect(res).toHaveProperty('product');
      expect(res).toHaveProperty('page');
      expect(res).toHaveProperty('count');
      expect(res).toHaveProperty('results');
      expect(Array.isArray(res.results)).toBe(true);
      expect(res.results[0]).toHaveProperty('review_id');
      expect(res.results[0]).toHaveProperty('rating');
      expect(res.results[0]).toHaveProperty('summary');
      expect(res.results[0]).toHaveProperty('recommend');
      expect(res.results[0]).toHaveProperty('response');
      expect(res.results[0]).toHaveProperty('body');
      expect(res.results[0]).toHaveProperty('date');
      expect(res.results[0]).toHaveProperty('reviewer_name');
      expect(res.results[0]).toHaveProperty('helpfulness');
      expect(res.results[0]).toHaveProperty('photos');
      expect(Array.isArray(res.results[0].photos)).toBe(true);
      done();
    })
    .catch(err => {
      console.error(err.stack);
    })
  });
});

describe('metadata', () => {
  it('should return the expected shape of metadata', (done) => {
    metadata.get(100)
    .then(response => {
      expect(typeof response).toBe('object');
      expect(response).toHaveProperty('product_id');
      expect(response).toHaveProperty('ratings');
      expect(response).toHaveProperty('recommended');
      expect(response).toHaveProperty('characteristics');
      expect(typeof response.ratings).toBe('object');
      expect(typeof response.recommended).toBe('object');
      expect(typeof response.characteristics).toBe('object');
      done();
    })
    .catch(err => {
      console.error(err.stack);
    });
  });

  it('should return the same shape even if the product_id doesnot exist', (done) => {
    metadata.get(99999999)
    .then(response => {
      expect(typeof response).toBe('object');
      expect(response).toHaveProperty('product_id');
      expect(response).toHaveProperty('ratings');
      expect(response).toHaveProperty('recommended');
      expect(response).toHaveProperty('characteristics');
      expect(typeof response.ratings).toBe('object');
      expect(typeof response.recommended).toBe('object');
      expect(typeof response.characteristics).toBe('object');
      done();
    })
    .catch(err => {
      console.error(err.stack);
    });
  });
});