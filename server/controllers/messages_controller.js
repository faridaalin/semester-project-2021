const Message = require('../model/message');
const ApiError = require('../error/apiError');

// All Message
exports.all_messages = async (req, res, next) => {
  try {
    const messages = await Message.find({});
    res.status(200).send({ status: 'ok', data: messages });
  } catch (err) {
    next(err);
  }
};

// Single Message
exports.messages_details = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) next(ApiError.notFound('Messages not found'));

    res.status(200).send({ status: 'ok', data: message });
  } catch (err) {
    if (err.name === 'CastError')
      next(ApiError.badRequest(`Invalid path with value: ${err.value}`));
    next(err);
  }
};

// Create an Message
exports.messages_create = async (req, res, next) => {
  try {
    await Message.create(req.body);
    res.status(201).send({ status: 'ok', message: 'Resource created' });
  } catch (err) {
    next(err);
  }
};

// Delete an Message
exports.messages_delete = async (req, res, next) => {
  try {
    const messageToDelete = await Message.findByIdAndRemove(req.params.id);
    if (!messageToDelete) {
      return next(ApiError.notFound('Message not found'));
    }

    res.status(202).send({
      status: 'Accepted',
      message: 'Resource deleted successfully',
    });
  } catch (err) {
    if (err.name === 'CastError')
      next(ApiError.badRequest(`Invalid path with value: ${err.value}`));
    next(err);
  }
};
