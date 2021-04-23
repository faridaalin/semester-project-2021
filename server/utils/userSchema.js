const yup = require('yup');

const { object, string } = yup;

exports.registerSchema = object({
  firstname: string('First name is required').trim().required().min(2).max(10),
  lastname: string().required('Last name is required').trim().min(2).max(10),
  email: string()
    .required('Email is required')
    .trim()
    .email('Invalid email address.'),
  password: string('Password is required').trim().required().min(8),
  role: string().optional().trim().default('public'),
});
exports.loginSchema = object({
  email: string()
    .required('Email is required')
    .trim()
    .email('Invalid email address.'),
  password: string('Password is required').trim().required().min(8),
});
exports.changePasswordSchema = object({
  newPassword: string('Password is required').trim().required().min(8),
});
