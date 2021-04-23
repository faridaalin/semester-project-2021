const Hotel = require('../model/hotel');
const ApiError = require('../error/apiError');

// All Hotels
exports.all_hotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).send({ status: 'ok', result: hotels.length, data: hotels });
  } catch (err) {
    next(ApiError.internalServerError('Internal Server error'));
  }
};

// Single Hotel
exports.hotel_details = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) throw ApiError.notFound('Hotel does not exist');
    res.status(200).send({ status: 'ok', data: hotel });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(ApiError.badRequest('Invalid id'));
    }
    next(err);
  }
};

// Create a hotel
exports.hotel_create = async (req, res, next) => {
  try {
    const hotel = await Hotel.create(req.body);

    res.status(200).send({ status: 'ok', data: hotel });
  } catch (err) {
    if (err.code === 11000) {
      next(ApiError.requestConflict(err.message));
    }
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
    res.status(200).send({ status: 'ok', data: updatedHotel });
    console.log('UPDATE PROD', req.body);
  } catch (err) {
    if (err.name === 'CastError')
      next(ApiError.badRequest(`Invalid path with value: ${err.value}`));
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
    if (err.name === 'CastError')
      next(ApiError.badRequest(`Invalid path with value: ${err.value}`));

    next(err);
  }
};
