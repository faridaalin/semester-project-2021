const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AttractionsSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Hotel title is required'],
      minLength: [2, 'Title must be at least 2 char.'],
      maxLength: [30, 'Title can not be longer than 30 char.'],
    },
    image_url: {
      type: String,
      required: [true, 'Attractions must have a main image.'],
    },
    description: {
      type: String,
      minLength: [
        100,
        'Description of the attraction must be at least 100 char',
      ],
      required: [true, 'Description of the attraction is required'],
    },
  },
  { collection: 'attractions' }
);

module.exports = mongoose.model('Attractions', AttractionsSchema);
