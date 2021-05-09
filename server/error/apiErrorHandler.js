const ApiError = require('./apiError');

const devError = (err, req, res, next) => {
  console.log('err', err);
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
    return res.status(err.code).send({
      status: err.code,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  return res.status(500).send({ status: 500, message: 'Something went wrong' });
};
const prodError = (err, req, res, next) => {
  return res.status(err.code).send({
    status: err.code,
    message: err.message,
  });
};

const apiErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    devError(err, req, res, next);
  } else if (process.env.NODE_ENV === 'production') {
    prodError(err, req, res, next);
  } else {
    return res.status(err.code || 500).send({
      status: err.code || 500,
      message: err.message || 'Something went wrong',
    });
  }
};

module.exports = apiErrorHandler;
