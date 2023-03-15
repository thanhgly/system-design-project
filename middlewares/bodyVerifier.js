module.exports = (req, res, next) => {
  if (req.method !== 'POST') {
    next();
    return;
  }

  let data = req.body;

  if (Object.keys(data).length === 0) {
    res.status(422).send('Error: Review body contains invalid entries').end();
    return;
  }

  for (let key in data) {
    if (key === 'recommend' && typeof data[key] === 'boolean') {
      continue;
    }
    if (!!data[key] === false) {
      res.status(422).send('Error: Review body contains invalid entries').end();
      return;
    }
  }

  console.log('Request body = ', data);
  next();
};