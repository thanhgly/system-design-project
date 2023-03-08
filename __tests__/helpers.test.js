const { getSortQuery } = require('../utils/index');

describe('getSortQuery', () => {
  it('should return "ORDER BY date DESC" if given "newest" as input', () => {
    expect(getSortQuery('newest')).toBe('ORDER BY date DESC');
  });

  it('should return "ORDER BY rating DESC" if given "relevant" as input', () => {
    expect(getSortQuery('relevant')).toBe('ORDER BY rating DESC');
  });

  it('should return "ORDER BY helpfulness DESC" if given "helpful" as input', () => {
    expect(getSortQuery('helpful')).toBe('ORDER BY helpfulness DESC');
  });
});

