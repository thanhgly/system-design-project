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

const generateQueryString = (type, data) => {
  switch (type) {
    case 'photos':
      return data.map((url) => `((SELECT id FROM inserted_id), '${url}')`).join(',');
    case 'characteristics':
      return objToQueryStr(data);
  }
};

const objToQueryStr = (chars) => {
  let strs = '';
  for (let char in chars) {
    strs += `(${char}, (SELECT id FROM inserted_id), ${chars[char]}),`;
  }
  return strs.slice(0, strs.length - 1); // get rid of the last ','
};

module.exports = { getSortQuery, generateQueryString };