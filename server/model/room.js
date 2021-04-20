const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  room_type: {
    type: String,
    required: [true, 'Room type is required'],
    max: [100, 'Room can not be longer than 100 char.'],
  },
  sleeps: {
    type: Number,
    min: 1,
    required: [true, 'Number of guests are required'],
  },
  price: { type: Number, required: [true, 'Prise is required'] },
});

module.exports = mongoose.model('Room', RoomSchema);
