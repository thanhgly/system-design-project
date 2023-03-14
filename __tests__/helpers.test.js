/* eslint-disable no-undef */

const utils = require('../utils/index');
const db = require('../db');

afterAll(() => {
  db.end();
});

describe('getSortQuery', () => {
  it('should return "ORDER BY date DESC" if given "newest" as input', () => {
    expect(utils.getSortQuery('newest')).toBe('ORDER BY date DESC');
  });

  it('should return "ORDER BY rating DESC" if given "relevant" as input', () => {
    expect(utils.getSortQuery('relevant')).toBe('ORDER BY rating DESC');
  });

  it('should return "ORDER BY helpfulness DESC" if given "helpful" as input', () => {
    expect(utils.getSortQuery('helpful')).toBe('ORDER BY helpfulness DESC');
  });
});

describe('addReview', () => {
  it('should ', (done) => {
    utils.addReview(1, 4, 'summary text', 'body text', true, 'tester', 'tester@test.com')
    .then(res => {
      console.log(res);
    })
    .then(() => {
      return db.query('DELETE FROM reviews WHERE id = (SELECT MAX(id) FROM reviews');
    })
    .then(() => {
      done();
    });
  })
});

