const Enquiry = require('../model/enquiry');

// All Enquiries
exports.all_enquiries = (req, res) => {
  Enquiry.find({}, (err, result) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    res.send({ result: result });
  });
};

// Single Enquiry
exports.enquiry_details = (req, res) => {
  Enquiry.findById(req.params.id, (err, result) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    res.send({ result: result });
  });
};

// Create an enquiry
exports.enquiry_create = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin')
    return res.status(403).send({ status: 'error', error: 'Access denied' });

  console.log('Booking😺', req.body);
  const enquiry = new Enquiry(req.body);

  enquiry.save((err) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    res.send(enquiry);
  });
};

// Update an enquiry
exports.enquiry_update = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin')
    return res.status(403).send({ status: 'error', error: 'Access denied' });

  Enquiry.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
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

// Delete an enquiry
exports.enquiry_delete = (req, res) => {
  const { role } = req.user;
  if (role !== 'admin')
    return res.status(403).send({ status: 'error', error: 'Access denied' });

  Enquiry.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    res.send('Enquiry Deleted');
  });
};
