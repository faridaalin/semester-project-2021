import { object, string, date, number, ref } from 'yup';

const enquirySchema = object({
  check_in: date()
    .required('Required')
    .nullable()
    .min(new Date().toLocaleDateString('en-US')),
  check_out: date()
    .required('Required')
    .nullable()
    .min(ref('check_in'), "Check out can't be before check in"),
  hotel_name: string().required('Hotel is required').min(2),
  children: number().optional().integer().positive().min(0).max(8),
  adults: number().required('Required').integer().positive().min(1).max(8),
  room_type: string().required('Required').min(5),
  firstname: string().required('Required').min(2).max(10),
  lastname: string().required('Required').min(2).max(10),
  email: string().required('Required').email('Invalid email address.'),
  special_requests: string().optional().max(100),
});

export default enquirySchema;
