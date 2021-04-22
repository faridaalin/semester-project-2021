const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../model/user');

module.exports = (req, res, next) => {
  console.log('Auth middleware😀');
  const authHeader = req.headers.authorization;
  console.log('authHeader', authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send({ status: 'Access denied' });

  try {
    // Validate token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log('err', err);
        res.status(401).send({ status: 'error', error: 'Access denied' });
        return res.redirect('/');
      }

      req.user = user;

      if (user.role === 'admin') {
        next();
      } else {
        return res
          .status(401)
          .send({ status: 'error', error: 'You must be an admin user' });
      }
    });
  } catch (error) {
    console.log(error);
    res.send({ status: 'error', error: error.message });
  }
};
