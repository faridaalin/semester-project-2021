const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

const auth = require('./middleware/auth');
const ApiError = require('./error/apiError');
const apiErrorHandler = require('./error/apiErrorHandler');

const home = require('./routes/api/home');
const hotels = require('./routes/api/hotel');
const enquiries = require('./routes/api/enquiry');
const messages = require('./routes/api/message');
const users = require('./routes/api/user');
const attractions = require('./routes/api/attraction');
const { constants } = require('fs');

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`DB connected..`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB();

// MIDDLEWARE

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// ROUTES
app.use('/', home);
app.use('/api/hotels', hotels);
app.use('/api/enquiries', enquiries);
app.use('/api/messages', messages);
app.use('/api/users', users);
app.use('/api/attractions', attractions);

app.use((req, res, next) => {
  next(ApiError.notFound('Not Found'));
});

// Error handler - next(err)
app.use(apiErrorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
