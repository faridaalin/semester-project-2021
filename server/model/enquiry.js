const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const EnquirySchema = new Schema(
  {
    hotel_name: {
      type: String,
      required: [true, 'Hotel title is required'],
      minLength: [2, 'Title must be at least 2 char.'],
      maxLength: [20, 'Title can not be longer than 100 char.'],
    },
    check_in: { type: Date },
    check_out: { type: Date, required: [true, 'Check out date is required'] },
    room_type: { name: String },
    adults: {
      type: Number,
      required: [true, 'Adults are required'],
      min: [1, 'There must be at least 1 adult.'],
    },
    children: {
      type: Number,
      required: [true, 'Children are required'],
      default: 0,
    },
    price: { type: Number, required: [true, 'Price is required'] },
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
    special_requests: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'enquiries' }
);

module.exports = mongoose.model('Enquiry', EnquirySchema);
