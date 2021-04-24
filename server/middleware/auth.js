const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ApiError = require('../error/apiError');
const User = require('../model/user');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) throw ApiError.unauthorizedRequest('Access denied');

  try {
    // Validate token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        next(ApiError.forbiddenRequest('Forbidden, access denied'));
        return res.redirect('/');
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
