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

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1mlha.mongodb.net/holidaze?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// MIDDLEWARE

// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.header('origin'));
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
