const db = require('../db');

const getSortQuery = (sortString) => {
  switch (sortString) {
    case 'newest':
      return 'ORDER BY date DESC';
    case 'relevant':
      return 'ORDER BY rating DESC';
    case 'helpful':
      return 'ORDER BY helpfulness DESC';
  }
};

module.exports = { getSortQuery };