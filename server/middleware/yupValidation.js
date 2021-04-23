const ApiError = require('../error/apiError');

const validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body, {
        abortEarly: false,
      });
      req.body = validatedBody;
      next();
    } catch (err) {
      next(ApiError.badRequest(err));
    }
  };
};

module.exports = validateSchema;
