import { object, string, number, array } from 'yup';

export const initialProductValues = {
  title: '',
  subheading: '',
  address: '',
  description: '',
  main_image: '',
  images: [''],
  category: '',
  rooms: [
    {
      room_type: '',
      sleeps: '',
      price: '',
    },
  ],
};

export const productSchema = object({
  title: string().required('Required').min(2).max(30),
  subheading: string().required('Required').min(2).max(100),
  description: string().required('Required').min(10),
  main_image: string()
    .matches(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim)
    .required('Required'),
  images: array(
    string()
      .matches(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim)
      .required('Required')
  )
    .required('Required')
    .min(1),
  address: string().required('Required'),
  category: string().required('Required'),
  rooms: array(
    object({
      room_type: string().required('Required').max(30),
      sleeps: number().required('Required').min(1),
      price: number().required('Required'),
    })
  )
    .required('Required')
    .min(1),
});

export const updateHotelSchema = object({
  title: string().required('Required').min(2).max(30),
  subheading: string().required('Required').min(2).max(100),
  description: string().required('Required').min(10),
  main_image: string()
    .matches(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim)
    .required('Required'),
  images: array(
    string()
      .matches(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim)
      .required('Required')
  )
    .required('Required')
    .min(1),
  rating: number().optional().min(0).max(5),
  address: string().required('Required'),
  category: string().required('Required'),
  rooms: array(
    object({
      room_type: string().required('Required').max(30),
      sleeps: number().required('Required').min(1),
      price: number().required('Required'),
    })
  )
    .required('Required')
    .min(1),
});
