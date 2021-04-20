const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    minLength: 2,
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    minLength: 2,
  },
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email address.',
    ],
    required: [true, 'Please enter Email Address'],
    lowercase: true,
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    maxlength: 30,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    minLength: 10,
    maxlength: 200,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
