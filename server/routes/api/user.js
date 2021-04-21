const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user_controller');

// /users/register
router.post('/register', enquiryController.enquiry_register);

module.exports = router;
