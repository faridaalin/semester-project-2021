const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const hotels = require('./routes/api/hotel');
const enquiries = require('./routes/api/enquiry');
const messages = require('./routes/api/message');

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1mlha.mongodb.net/holidaze?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/hotels', hotels);
app.use('/api/enquiries', enquiries);
app.use('/api/messages', messages);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
