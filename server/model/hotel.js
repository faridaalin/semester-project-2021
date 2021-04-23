const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  room_type: {
    type: String,
    required: [true, 'Room type is required'],
    maxlength: [20, 'Room can not be longer than 100 char.'],
  },
  sleeps: {
    type: Number,
    trim: true,
    min: 1,
    required: [true, 'Number of guests are required'],
  },
  price: { type: Number, required: [true, 'Prise is required'], trim: true },
});

const HotelSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Hotel title is required'],
      minLength: [2, 'Title must be at least 2 char.'],
      maxLength: [20, 'Title can not be longer than 100 char.'],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      trim: true,
      minLength: [1, 'Rating must have length of minmum 1'],
    },
    description: {
      type: String,
      minLength: [10, 'Description must be at least 10 char'],
      required: [true, 'Description is required'],
    },
    main_image: {
      type: [String],
      required: [true, 'Hotel must have a main image.'],
    },
    images: [{ type: [String], required: [true, 'Hotel image is required'] }],
    address: { type: String, required: [true, 'Hotel address is required'] },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    rooms: [RoomSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'hotels' }
);

module.exports = mongoose.model('Hotel', HotelSchema);
