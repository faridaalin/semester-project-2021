const Message = require('../model/message');
const catchAsyncHandler = require('../middleware/catchAsyncHandler');

// All Message
exports.all_messages = catchAsyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    const error = new Error('You must be logged in as admin user');
    error.status = 403;
    return next(error);
  }

  const response = await Message.find({});

  if (!response || response.length === 0) {
    const error = new Error('There is no messages at the moment');
    error.status = 404;
    return next(error);
  }
  res.status(200).send({ status: 'ok', data: response });
});

// Single Message
exports.messages_details = catchAsyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    const error = new Error('You must be logged in as admin user');
    error.status = 403;
    return next(error);
  }

  Message.findById(req.params.id, (err, message) => {
    if (err) {
      if (err.name === 'CastError') {
        const error = new Error(`Invalid path with value: ${err.value}`);
        error.status = 400;
        next(error);
      }
      next(err);
    }
    if (!message || message.length === 0) {
      const error = new Error('Messages not found');
      error.status = 404;
      return next(error);
    }
    res.status(200).send({ status: 'ok', data: message });
  });
});

// Create an Message
exports.messages_create = (req, res, next) => {
  Message.create(req.body, (err, message) => {
    if (err) {
      err.status = 400;
      return next(err);
    }
    res.status(200).send({ status: 'ok', data: message });
  });
};

// Update an Message
exports.messages_update = (req, res, next) => {
  Message.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
    (err, message) => {
      if (err) {
        console.log('ERROR😃', err);
        //403 Forbidden
        err.status = 400;
        return next(err);
      } else {
        res.status(200).send({ status: 'ok', data: message });
      }
    }
  );
};

// Delete an Message
exports.messages_delete = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    const error = new Error('You must be logged in as admin user');
    error.status = 403;
    return next(error);
  }

  Message.findByIdAndRemove(req.params.id, (err, message) => {
    if (err) {
      err.status = 400;
      return next(err);
    }

    if (!message) {
      const error = new Error('Not found');
      error.status = 404;
      return next(error);
    }

    res.status(204).send({
      status: 'Resource deleted successfully',
      data: message,
    });
  });
};
