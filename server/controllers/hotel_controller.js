const Hotel = require('../model/hotel');

// All Hotels
exports.all_hotels = (req, res) => {
  Hotel.find({}, (err, hotel) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    res.send(hotel);
  });
};

// Single Hotel
exports.hotel_details = (req, res) => {
  Hotel.findById(req.params.id, (err, hotel) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    res.send(hotel);
  });
};

// Create a hotel
exports.hotel_create = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin')
    return res.status(403).send({ status: 'error', error: 'Access denied' });

  const hotel = new Hotel(req.body);
  console.log(hotel);
  hotel.save((err) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    res.send(hotel);
  });
};

// Update hotel
exports.hotel_update = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin')
    return res.status(403).send({ status: 'error', error: 'Access denied' });

  Hotel.findByIdAndUpdate(
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

// Delete Hotel

exports.hotel_delete = (req, res) => {
  const { role } = req.user;
  if (role !== 'admin')
    return res
      .status(403)
      .send({ status: 'error', error: 'You must be logged in as admin user' });

  Hotel.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    res.send('Hotel Deleted');
  });
};
