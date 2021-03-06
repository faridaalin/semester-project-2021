const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const ApiError = require('../error/apiError');
const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
  const id = user._id;
  const payload = ({ _id, role, firstname, lastname, email } = user);

  return jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

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

    const token = createToken(newUser, newUser);

    res.status(200).send({ status: 'ok', data: newUser });
  } catch (err) {
    next(err);
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
      const payload = user;
      const token = createToken(payload);
      const { role, email, firstname, lastname } = user;

      return res.status(200).send({
        status: 'ok',
        token: token,
        user: { firstname, lastname, email, role },
      });
    }
    // Invalid password
    return next(ApiError.forbiddenRequest('Invalid username/password'));
  } catch (err) {
    next(err);
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
    next(ApiError.badRequest('Authorization failed'));
  }
};

exports.user_logout = (req, res, next) => {
  try {
    res.status(200).send({ data: 'Logged out' });
  } catch (err) {
    next(err);
  }
};
