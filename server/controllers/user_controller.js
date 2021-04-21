const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
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
    // Check if user already exist
    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(403)
        .send({ status: 'error', error: 'User already exist' });

    // Create new user
    const newUser = await User.create({
      email,
      password,
      firstname,
      lastname,
      role,
    });
    res.send({ status: 'Success', data: newUser });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key
      return res.send({ status: 'error', error: 'Email is already in use!' });
    } else {
      return res.send({ status: 'error', error: error });
    }
  }
};

// Login user
exports.user_login = async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.send({ status: 'error', error: 'Invalid username/password' });

  if (await bcrypt.compare(password, user.password)) {
    // password is a match
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.send({ status: 'ok', token: token, data: user });
  }

  return res.send({ status: 'error', error: 'Invalid username/password' });
};

// Change password
exports.user_changePassword = async (req, res, next) => {
  const { token, newPassword } = req.body;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const id = user.id;
    const hashedpassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(
      id,
      { password: hashedpassword },
      { new: true }
    );
    res.send({ status: 'ok' });
  } catch (error) {
    res.send({ status: 'error', error: error });
  }
};
