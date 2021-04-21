const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, 'First name is required'],
      minLength: 2,
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, 'Last name is required'],
      minLength: 2,
      trim: true,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid email address.',
      ],
      required: [true, 'Please enter Email Address'],
      lowercase: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['public', 'admin'],
      default: 'public',
      required: [true, 'Role is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: 8,
      trim: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'users' }
);

module.exports = mongoose.model('User', UserSchema);
