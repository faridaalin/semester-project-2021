const yup = require('yup');

const { object, string } = yup;

exports.attractionSchema = object({
  name: string().min(2).max(30).required(),
  image_url: string()
    .trim()
    .matches(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim)
    .required(),
  description: string().min(100).required(),
});
