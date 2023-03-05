module.exports = (req, res, next) => {
  const requestStart = Date.now();

  res.on('finish', () => {
    const {method, url} = req;
    const timestamp = new Date();

    console.log('');
    console.log('\x1b[37m%s\x1b[0m', timestamp.toLocaleString());
    console.log('\x1b[36m%s\x1b[0m', `Serving ${method} ${url}`);
    console.log('\x1b[33m%s\x1b[0m', `Processing time: ${timestamp - requestStart}ms`);
  });

  next();
};