const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user_controller');

// /messages
router.get('/', userController.all_users);

// /users/register
router.post('/register', userController.user_register);

module.exports = router;
