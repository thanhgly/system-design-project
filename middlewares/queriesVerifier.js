module.exports = (req, res, next) => {
  if (req.method !== 'GET') {
    next();
    return;
  }

  let {product_id, page, count, sort} = req.query;
  let acceptableSorts = ['newest', 'relevant', 'helpful'];

  if (isNaN(product_id)) {
    res.status(422).send('Error: invalid product_id provided');
    return;
  }

  if (isNaN(page)) {
    req.query.page = 1;
  }

  if (isNaN(count)) {
    req.query.count = 5;
  }

  if (!acceptableSorts.includes(sort)) {
    req.query.sort = acceptableSorts[0];
  }

  next();
};