const reviews = require('../models/reviews');
const db = require('../db/index');

afterAll(() => {
  db.end();
});

describe('get', () => {
  it('should return the expected shape for reviews', (done) => {
    reviews.get(100)
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

  it('should return the expected shape with an empty array result when given a nonx-existent product', (done) => {
    reviews.get(99999999)
    .then(res => {
      expect(res).toHaveProperty('product');
      expect(res).toHaveProperty('page');
      expect(res).toHaveProperty('count');
      expect(res).toHaveProperty('results');
      expect(res.results).toEqual([]);
      done();
    });
  });

  it('should throw an error if query fails', (done) => {
    reviews.get('aaa')
    .catch(err => {
      expect(err.message).toBe('column "aaa" does not exist');
      done();
    })
  });
});