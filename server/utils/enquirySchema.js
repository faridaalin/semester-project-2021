const yup = require('yup');

const { object, string, date, number } = yup;

exports.enquirySchema = object({
  hotel_name: string().required().min(2).max(40),
  check_in: date().required().min(new Date()),
  check_out: date().required(),
  room_type: string().required().min(1),
  adults: number().required().min(1).positive(),
  children: number().required().min(0).default(0),
  price: number().required().min(1).positive(),
  firstname: string().trim().required().min(2),
  lastname: string().trim().required(),
  email: string()
    .required('Email is required')
    .trim()
    .email('Invalid email address.'),
  special_requests: string().optional(),
});
exports.enquiryUpdateSchema = object({
  hotel_name: string().min(2).max(50),
  check_in: date().min(new Date()),
  check_out: date(),
  room_type: string().min(1),
  adults: number().min(1).positive(),
  children: number().min(0).default(0),
  price: number().min(1).positive(),
  firstname: string().trim().min(2),
  lastname: string().trim(),
  email: string().trim().email('Invalid email address.'),
  special_requests: string().optional(),
});
