import { object, string, array, number } from 'yup';

export const initialProductValues = {
  title: '',
  subheading: '',
  address: '',
  description: '',
  main_image: '',
  images: '',
  address: '',
  category: '',
  room_type: '',
  rooms: '',
};

export const productSchema = object({
  title: string().required('Required').min(2).max(30),
  subheading: string().required('Required').min(2).max(100),
  address: string().required('Required').min(2),
  description: string().optional().min(10).max(200),
  main_image: string().required('Required'),
  images: array(string().required('Required')).required().min(1),
  address: string().required('Required'),
  category: string().required('Required'),
  room_type: string().required('Required').min(5),
  rooms: array(
    object({
      room_type: string().required('Required').max(30),
      sleeps: number().required('Required').min(1).max(6),
      price: number().required('Required').positive(),
    })
  )
    .required()
    .min(1),
});

// Update
// - rating
