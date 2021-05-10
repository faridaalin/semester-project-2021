const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
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
      trim: true,
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
    isRead: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'messages' }
);

module.exports = mongoose.model('Message', MessageSchema);
