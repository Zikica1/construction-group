const { logEvents } = require('./logEvents');

const errorHandler = async (err, req, res, next) => {
  await logEvents(`${err.name}:${err.message}\n`, 'errorLog.txt');
  res.status(500).send(err.message);
  next();
};

module.exports = errorHandler;
