const ApiError = require('./apiError');

const apiErrorHandler = (err, req, res, next) => {
  // Production - don not use  console.log(error), remove it later
  console.log('ERROR 🙇‍♂️', err);

  if (err instanceof ApiError) {
    return res
      .status(err.code)
      .send({ status: err.code, message: err.message });
  }

  return res.status(500).send({ status: 500, message: 'Something went wrong' });
};

module.exports = apiErrorHandler;
