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


