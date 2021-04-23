const yup = require('yup');

const { object, string } = yup;

exports.messageSchema = object({
  firstname: string('First name is required').trim().required().min(2).max(10),
  lastname: string().required('Last name is required').trim().min(2).max(10),
  email: string()
    .required('Email is required')
    .trim()
    .email('Invalid email address.'),
  subject: string().required().max(30),
  message: string().required().min(10).max(200),
});
