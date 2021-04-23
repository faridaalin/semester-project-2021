const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

const enquiryController = require('../../controllers/enquiry_controller');
const validateSchema = require('../../middleware/yupValidation');
const schema = require('../../utils/enquirySchema');

// /enquiries
router.get('/', auth, enquiryController.all_enquiries);

// /enquiries/4
router.get('/:id', auth, enquiryController.enquiry_details);

// /enquiries/create
router.post(
  '/create',
  validateSchema(schema.enquirySchema),
  enquiryController.enquiry_create
);

//  /enquiries/4/update
router.patch(
  '/:id/update',
  auth,
  validateSchema(schema.enquiryUpdateSchema),
  enquiryController.enquiry_update
);

//  /enquiries/4/delete
router.delete('/:id/delete', auth, enquiryController.enquiry_delete);

module.exports = router;
