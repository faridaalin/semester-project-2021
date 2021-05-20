const mongoose = require('mongoose');
const fs = require('fs');
const hotelsData = require('./hotels.json');
const messageData = require('./messages.json');
const enquiryData = require('./enquries.json');
const Hotel = require('../model/hotel');
const Enquiry = require('../model/enquiry');
const Message = require('../model/message');
require('dotenv').config();

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1mlha.mongodb.net/holidaze?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log('Connected to MongoDB ✅ ✅'))
  .catch((err) => console.log('ERROR!💥 💥 ', err));

// Import to database
const importData = async () => {
  try {
    await Hotel.create(hotelsData);
    await Enquiry.create(enquiryData);
    await Message.create(messageData);
    console.log('Data LOADED!💃');
  } catch (err) {
    console.log('ERROR while importing data!💥 💥 ', err);
  }
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    await Hotel.deleteMany();
    await Enquiry.deleteMany();
    await Message.deleteMany();
    console.log('Data DELETED!⛔');
  } catch (err) {
    console.log('ERROR while deleting data!💥 💥 ', err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();
