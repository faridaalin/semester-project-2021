const Hotel = require('../model/hotel');
const ApiError = require('../error/apiError');

// All Hotels
exports.all_hotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).send({ status: 'ok', result: hotels.length, data: hotels });
  } catch (err) {
    next(err);
  }
};

// Single Hotel
exports.hotel_details = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) throw ApiError.notFound('Hotel does not exist');
    res.status(200).send({ status: 'ok', data: hotel });
  } catch (err) {
    next(err);
  }
};

// Create a hotel
exports.hotel_create = async (req, res, next) => {
  try {
    const hotel = await Hotel.create(req.body);

    res.status(200).send({ status: 'ok', data: hotel });
  } catch (err) {
    next(err);
  }
};

// Update hotel
exports.hotel_update = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedHotel) throw ApiError.notFound('Hotel does not exist');
    res.status(200).send({ status: 'ok', data: updatedHotel });
  } catch (err) {
    next(err);
  }
};

// Delete Hotel
exports.hotel_delete = async (req, res, next) => {
  try {
    const hotelToDelete = await Hotel.findByIdAndRemove(req.params.id);
    if (!hotelToDelete) {
      return next(ApiError.notFound('Hotel not found'));
    }

    res.status(202).send({
      status: 'Accepted',
      message: 'Resource deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
