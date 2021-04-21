const bcrypt = require('bcryptjs');
const User = require('../model/user');

// all users
exports.all_users = (req, res, next) => {
  res.send({ user: 'No users' });
};

// Create user
exports.user_register = async (req, res, next) => {
  console.log('User', req.body);
  const {
    password: unshashedPassword,
    email,
    firstname,
    lastname,
    role,
  } = req.body;
  if (!email || typeof email !== 'string')
    return res.send({ status: 'error', error: 'Invalid email' });

  if (!unshashedPassword || typeof unshashedPassword !== 'string')
    return res.send({ status: 'error', error: 'Invalid password' });
  if (unshashedPassword < 8)
    return res.send({
      status: 'error',
      error: 'Password is too short, 8 char at least.',
    });

  // Hashing Password
  const password = await bcrypt.hash(unshashedPassword, 10);

  try {
    const response = await User.create({
      email,
      password,
      firstname,
      lastname,
      role,
    });
    console.log('User Created successfully🍄:', response);
    res.send({ status: response });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key
      return res.send({ status: 'error', error: 'Email is already in use!' });
    } else {
      return res.send({ status: 'error', error: error });
    }
  }
};
