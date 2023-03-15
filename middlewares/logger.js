module.exports = (req, res, next) => {
  const requestStart = Date.now();
  const {method, url} = req;
  const body = req.body;

  res.on('finish', () => {
    const timestamp = new Date();

    console.log(
      `\x1b[37mAt ${timestamp.toLocaleString()}\x1b[0m`
      + ' | ' +
      `\x1b[36mServing ${method} ${url}\x1b[0m`
      + ' | ' +
      `\x1b[33mProcessing time: ${timestamp - requestStart}ms\x1b[0m`
    );

    if (Object.keys(body).length) {
      console.log('Request body = ', body);
    }

  });

  next();
};