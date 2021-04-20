const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  room_type: {
    type: String,
    required: [true, 'Room type is required'],
    maxlength: [100, 'Room can not be longer than 100 char.'],
  },
  sleeps: {
    type: Number,
    min: 1,
    required: [true, 'Number of guests are required'],
  },
  price: { type: Number, required: [true, 'Prise is required'] },
});

const HotelSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Hotel title is required'],
    maxLength: [100, 'Title can not be longer than 100 char.'],
  },
  rating: { type: Number, min: 1, max: 5 },
  description: { type: String, required: [true, 'Description is required'] },
  image: { type: [String], required: [true, 'Image is required'] },
  address: { type: String, required: [true, 'Hotel address is required'] },
  category: { type: String, required: [true, 'Category is required'] },
  rooms: [RoomSchema],
});

module.exports = mongoose.model('Hotel', HotelSchema);
