/* eslint-disable no-undef */

const utils = require('../utils/index');

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


describe('generateQueryString', () => {
  it('should return a correct string when given an array of url', () => {
    let id = '(SELECT id FROM inserted_id)';
    let photos = ['url1', 'url2', 'url3'];
    let expectedStr = `(${id}, url1),(${id}, url2),(${id}, url3)`;

    expect(utils.generateQueryString('photos', photos)).toBe(expectedStr);
  });

  it('should return a currect string when given an object of chars', () => {
    let id = '(SELECT id FROM inserted_id)';
    let characteristics = {'14': 5, '15': 5, '16': 5};
    let expectedStr = `(14, ${id}, 5),(15, ${id}, 5),(16, ${id}, 5)`;

    expect(utils.generateQueryString('characteristics', characteristics)).toBe(expectedStr);
  });
});

