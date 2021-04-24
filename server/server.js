const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const auth = require('./middleware/auth');
const ApiError = require('./error/apiError');
const apiErrorHandler = require('./error/apiErrorHandler');

const hotels = require('./routes/api/hotel');
const enquiries = require('./routes/api/enquiry');
const messages = require('./routes/api/message');
const users = require('./routes/api/user');
const dashboard = require('./routes/api/dashbaord');

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
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/hotels', hotels);
app.use('/api/enquiries', enquiries);
app.use('/api/messages', messages);
app.use('/api/users', users);
app.use('/api/dashboard', auth, dashboard);

app.use((req, res, next) => {
  // res.status(404).send({ status: 'error', error: 'Not Found' });
  next(ApiError.notFound('Not found'));
});

// Error handler - catched all next(err)
app.use(apiErrorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
