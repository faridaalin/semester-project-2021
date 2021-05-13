const yup = require('yup');

const { object, string, number, array } = yup;

exports.hotelSchema = object({
  title: string().required().min(2).max(30),
  subheading: string().required().min(2).max(100),
  rating: number().optional().min(0).max(5),
  description: string().required().min(10),
  main_image: string()
    .trim()
    .matches(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim)
    .required(),
  images: array(
    string()
      .trim()
      .matches(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim)
      .required()
  )
    .required()
    .min(1),
  address: string().required(),
  category: string().required(),
  rooms: array(
    object({
      room_type: string().required().max(30),
      sleeps: number().required().min(1),
      price: number().required(),
    })
  )
    .required()
    .min(1),
});
exports.hotelSchemaUpdate = object({
  title: string().min(2).max(20),
  rating: number().min(0).max(5),
  description: string().min(10),
  main_image: string()
    .trim()
    .matches(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim),
  images: array(
    string()
      .trim()
      .matches(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim)
  ),
  address: string(),
  category: string(),
  rooms: array(
    object({
      room_type: string().max(20),
      sleeps: number().min(1),
      price: number(),
    })
  ),
});
