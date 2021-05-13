import { object, string, date, number } from 'yup';

export const enquirySchema = object({
  check_in: date().required('Check in is required').nullable().min(new Date()),
  check_out: date()
    .required('Check out is required')
    .nullable()
    .min(new Date()),
  hotel_name: string().required('Hotel is required').min(2),
  price: number().required('Required').integer().positive(),
  children: number().optional().integer().positive().min(0).max(8),
  adults: number().required('Required').integer().positive().min(1).max(8),
  room_type: string().required('Required').min(5),
  firstname: string().required('First name is required').min(2).max(10),
  lastname: string().required('Last name is required').min(2).max(10),
  email: string().required('Email is required').email('Invalid email address.'),
  special_requests: string().optional().max(100),
});

export default enquirySchema;
