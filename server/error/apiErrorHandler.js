const ApiError = require('./apiError');

const apiErrorHandler = (err, req, res, next) => {
  // Production - don not use  console.log(error), remove it later

  console.log('ERROR🔥', err);

  if (err.name === 'CastError') {
    return res.status(400).send({
      status: 'Request Conflict',
      message: `Invalid ${err.path} with value: ${err.value}`,
    });
  }
  if (err.code === 11000) {
    return res.status(409).send({
      status: 'Request Conflict',
      message: `Duplicate error, value already exist.`,
    });
  }

  if (err instanceof ApiError) {
    return res
      .status(err.code)
      .send({ status: err.code, message: err.message });
  }
  return res.status(500).send({ status: 500, message: 'Something went wrong' });
};

module.exports = apiErrorHandler;
