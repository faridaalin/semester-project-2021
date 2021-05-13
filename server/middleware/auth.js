const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ApiError = require('../error/apiError');
const User = require('../model/user');

module.exports = (req, res, next) => {
  console.log('req headers', req.headers);
  if (!req.headers.authorization)
    throw ApiError.unauthorizedRequest('Access denied');

  const bearerHeader = req.headers.authorization;
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];

  if (!token) throw ApiError.unauthorizedRequest('Access denied');

  try {
    // Validate token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(ApiError.forbiddenRequest('Forbidden, access denied'));
      }

      req.user = user;

      if (user.payload.role === 'admin') {
        next();
      } else {
        next(ApiError.unauthorizedRequest('Forbidden, access denied'));
      }
    });
  } catch (err) {
    next(err);
  }
};
