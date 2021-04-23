const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ApiError = require('../error/apiError');

module.exports = (req, res, next) => {
  console.log('Auth middleware called😀 - ROLE IS', req.user);
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) throw ApiError.unauthorizedRequest('Access denied');

  try {
    // Validate token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        next(ApiError.forbiddenRequest('Forbidden, access denied'));
        return res.redirect('/');
      }

      req.user = user;

      if (user.role === 'admin') {
        next();
      } else {
        next(ApiError.unauthorizedRequest('Forbidden, access denied'));
      }
    });
  } catch (error) {
    next(ApiError.internalServerError(err));
  }
};
