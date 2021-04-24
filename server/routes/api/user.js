const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user_controller');
const validateSchema = require('../../middleware/yupValidation');
const userSchema = require('../../utils/userSchema');

// /users/register
router.post(
  '/register',
  validateSchema(userSchema.registerSchema),
  userController.user_register
);
router.post(
  '/login',
  validateSchema(userSchema.loginSchema),
  userController.user_login
);
router.post(
  '/change-password',
  validateSchema(userSchema.changePasswordSchema),
  userController.user_changePassword
);
router.get('/logout', userController.user_logout);

module.exports = router;
