const express = require('express');
const router = express.Router();

const enquiryController = require('../../../controllers/enquiry_controller');

// /enquiries
router.get('/', enquiryController.all_enquiries);

// /enquiries/4
router.get('/:id', enquiryController.enquiry_details);

// /enquiries/create
router.post('/create', enquiryController.enquiry_create);

//  /enquiries/4/update
router.patch('/:id/update', enquiryController.enquiry_update);

//  /enquiries/4/delete
router.delete('/:id/delete', enquiryController.enquiry_delete);

module.exports = router;
