const Attractions = require('../model/attractions');
const ApiError = require('../error/apiError');

// All attractions
exports.all_attractions = async (req, res, next) => {
  try {
    const attractions = await Attractions.find({});
    res.status(200).send({ status: 'ok', data: attractions });
  } catch (err) {
    next(err);
  }
};

// Single attractions
exports.attraction_details = async (req, res, next) => {
  try {
    const attraction = await Attractions.findById(req.params.id);
    if (!attraction) next(ApiError.notFound('Attraction not found'));

    res.status(200).send({ status: 'ok', data: attraction });
  } catch (err) {
    next(err);
  }
};

// Create an attractions
exports.attraction_create = async (req, res, next) => {
  try {
    await Attractions.create(req.body);
    res.status(201).send({ status: 'ok', message: 'Resource created' });
  } catch (err) {
    next(err);
  }
};

// Delete an attractions
exports.attraction_delete = async (req, res, next) => {
  try {
    const attractionsToDelete = await Attractions.findByIdAndRemove(
      req.params.id
    );
    if (!attractionsToDelete) {
      return next(ApiError.notFound('Resource not found'));
    }

    res.status(202).send({
      status: 'Accepted',
      message: 'Resource deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
