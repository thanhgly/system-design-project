const { reviews, metadata } = require('../models');
const db = require('../db/index');

// generate an id within the last 10% of a table
const generateRandomId = (table = 'products') => {
  let max = (table === 'products') ? 1000011 : 5774952;
  let min = Math.floor(max * 0.1);
  return Math.floor(Math.random() * (max - min) + min);
};

afterAll(() => {
  db.end();
});

describe('random id generator', () => {
  it('should return an ID within the last 10% of the product ids', () => {
    for (let i = 0; i < 10000; i++) {
      let id = generateRandomId('products');
      let max = 1000011;
      let min = Math.floor(max * 0.1);
      expect(id).toBeGreaterThanOrEqual(min);
      expect(id).toBeLessThan(max)
    };
  });

  it('should return an ID within the last 10% of the reviews ids', () => {
    for (let i = 0; i < 10000; i++) {
      let id = generateRandomId('reviews');
      let max = 5774952;
      let min = Math.floor(max * 0.1);
      expect(id).toBeGreaterThanOrEqual(min);
      expect(id).toBeLessThan(max)
    }
  });
});

describe('reviews\' read queries', () => {
  it('should respond in less than 50ms', (done) => {

    let start = performance.now();
    reviews.get(generateRandomId('products'))
    .then(() => {
      let end = performance.now();
      expect(Math.floor(end - start)).toBeLessThan(50);
      done();
    })
    .catch(err => {
      console.log(err.stack);
    });
  });
});

describe('metadata\'s read queries', () => {
  it('should respond in less than 50ms', (done) => {

    let start = performance.now();
    metadata.get(generateRandomId('reviews'))
    .then(() => {
      let end = performance.now();
      expect(Math.floor(end - start)).toBeLessThan(50);
      done();
    })
    .catch(err => {
      console.log(err.stack);
    });
  });
});