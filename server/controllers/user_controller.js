const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const catchAsyncHandler = require('../middleware/catchAsyncHandler');

// all users
exports.all_users = (req, res, next) => {
  res.send({ user: 'No users' });
};

// Create user
exports.user_register = catchAsyncHandler(async (req, res, next) => {
  const {
    password: unshashedPassword,
    email,
    firstname,
    lastname,
    role,
  } = req.body;

  if (!email || typeof email !== 'string') {
    const error = new Error('Invalid email');
    error.status = 403;
    return next(error);
  }

  if (!unshashedPassword || typeof unshashedPassword !== 'string') {
    const error = new Error('Invalid password');
    error.status = 403;
    return next(error);
  }

  if (unshashedPassword < 8) {
    const error = new Error('Password is too short, 8 char at least.');
    error.status = 403;
    return next(error);
  }

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
  res.status(200).send({ status: 'Success', data: newUser });

  // Duplicate key
  const error = new Error('Email is already registered');
  error.status = 403;
  next(error);
});

// Login user
exports.user_login = catchAsyncHandler(async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Invalid username/password');
    error.status = 403;
    return next(error);
  }

  if (await bcrypt.compare(password, user.password)) {
    // password is a match
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).send({ status: 'ok', token: token, data: user });
  }

  const error = new Error('Invalid username/password');
  error.status = 403;
  return next(error);
});

// Change password
exports.user_changePassword = catchAsyncHandler(async (req, res, next) => {
  const { token, newPassword } = req.body;

  const user = jwt.verify(token, process.env.JWT_SECRET);
  const id = user.id;
  const hashedpassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { password: hashedpassword },
    { new: true }
  );
  res.status(200).send({ data: 'Your password has been updated' });
});
