const reviews = require('../models/reviews');
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
    });
  });
});