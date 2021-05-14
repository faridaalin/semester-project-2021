import { object, string } from 'yup';

export const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  subject: '',
  message: '',
};

export const contactSchema = object({
  firstname: string('Required').trim().required().min(2).max(10),
  lastname: string().required('Required').trim().min(2).max(10),
  email: string().required('Required').trim().email('Invalid email address.'),
  subject: string().required('Required').max(30),
  message: string().required('Required').min(10).max(200),
});
