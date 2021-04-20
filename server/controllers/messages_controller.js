const Message = require('../model/message');

// All Message
exports.all_messages = (req, res) => {
  Message.find({}, (err, result) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    res.send({ result: result });
  });
};

// Single Message
exports.messages_details = (req, res) => {
  Message.findById(req.params.id, (err, result) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    res.send({ result: result });
  });
};

// Create an Message
exports.messages_create = (req, res, next) => {
  console.log('Message', req.body);

  const message = new Message(req.body);

  message.save((err) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    res.send(message);
  });
};

// Update an Message
exports.messages_update = (req, res, next) => {
  Message.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
    (err, result) => {
      if (err) {
        res.send(err);
        return next(err);
      } else {
        res.send({ result });
      }
    }
  );
};

// Delete an Message
exports.messages_delete = (req, res) => {
  Message.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    res.send('Message Deleted');
  });
};
