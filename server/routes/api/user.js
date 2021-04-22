const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user_controller');
const validate = require('../../utils/validate');
const userSchema = require('../../utils/validate');
// console.log('validate:', validate);
// console.log('userSchema:', userSchema);

// /messages
router.get('/', userController.all_users);

// /users/register
router.post(
  '/register',
  validate.validate(userSchema.userSchema),
  userController.user_register
);
router.post('/login', userController.user_login);
router.post('/change-password', userController.user_changePassword);

module.exports = router;
