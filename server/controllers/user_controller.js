const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const ApiError = require('../error/apiError');

// Create user
exports.user_register = async (req, res, next) => {
  const {
    password: unshashedPassword,
    email,
    firstname,
    lastname,
    role,
  } = req.body;
  try {
    // Hashing Password
    const password = await bcrypt.hash(unshashedPassword, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password,
      firstname,
      lastname,
      role,
    });

    res.status(200).send({ status: 'ok', data: newUser });
  } catch (err) {
    console.log('INSIDE ERROR 🙇‍😀');
    next(ApiError.requestConflict('Email is already registered'));
  }
};

// Login user
exports.user_login = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(ApiError.forbiddenRequest('Invalid username/password'));
    }

    if (await bcrypt.compare(password, user.password)) {
      // password is a match
      const payload = { id: user.id, email: user.email, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return res.status(200).send({ status: 'ok', token: token, data: user });
    }
    // Invalid password
    return next(ApiError.forbiddenRequest('Invalid username/password'));
  } catch (err) {
    next(ApiError.forbiddenRequest('Invalid username/password'));
  }
};

// Change password
exports.user_changePassword = async (req, res, next) => {
  const { token, newPassword: unshashedPassword } = req.body;

  if (!token) {
    return next(
      ApiError.badRequest(
        'Token is required. Please provide a valid auth token'
      )
    );
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const id = user.id;
    const newHashedpassword = await bcrypt.hash(unshashedPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: newHashedpassword },
      { new: true }
    );
    res.status(200).send({ data: 'Your password has been updated' });
  } catch (err) {
    next(ApiError.badRequest('Authorization failed '));
  }
};
