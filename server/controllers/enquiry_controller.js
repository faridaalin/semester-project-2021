const Enquiry = require('../model/enquiry');
const ApiError = require('../error/apiError');

// All Enquiries
exports.all_enquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find({});
    res
      .status(200)
      .send({ status: 'ok', result: enquiries.length, data: enquiries });
  } catch (err) {
    next(err);
  }
};

// Single Enquiry
exports.enquiry_details = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) throw ApiError.notFound('Enquiry does not exist');
    res.status(200).send({ status: 'ok', data: enquiry });
  } catch (err) {
    console.log('err', err);
    if (err.name === 'CastError') {
      return next(ApiError.badRequest('Invalid id'));
    }
    next(err);
  }
};

// Create an enquiry
exports.enquiry_create = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(200).send({ status: 'ok', data: enquiry });
  } catch (err) {
    next(err);
  }
};

// Update an enquiry
exports.enquiry_update = async (req, res, next) => {
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEnquiry) throw ApiError.notFound('Enquiry does not exist');
    res.status(200).send({ status: 'ok', data: updatedEnquiry });
  } catch (err) {
    if (err.name === 'CastError')
      next(ApiError.badRequest(`Invalid path with value: ${err.value}`));
    next(err);
  }
};

// Delete an enquiry
exports.enquiry_delete = async (req, res, next) => {
  try {
    const enquiryToDelete = await Enquiry.findByIdAndRemove(req.params.id);
    if (!enquiryToDelete) throw ApiError.notFound('Hotel does not exist');

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
