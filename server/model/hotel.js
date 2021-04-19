const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Hotel title is required'],
    max: [100, 'Title can not be longer than 100 char.'],
  },
  rating: { type: Number, min: 1, max: 5 },
  description: { type: String, required: [true, 'Description is required'] },
  image: { type: [String], required: [true, 'Image is required'] },
  address: { type: String, required: [true, 'Hotel address is required'] },
});
