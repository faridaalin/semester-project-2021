const yup = require('yup');

const { object, string } = yup;

const userSchema = object({
  firstname: string('First name is required').required().min(2).max(10),
  lastname: string().required('Last name is required').min(2).max(8),
  email: string().required('Email is required').email('Invalid email address.'),
  password: string('First name is required').required().min(8),
  role: string().optional(),
});

const validate = (resourceSchema) => async (req, res, next) => {
  const resource = req.body;
  try {
    // throws an error if not valid
    await resourceSchema.validate(resource, {
      stripUnknown: true,
      abortEarly: false,
    });
    next();
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.errors.join(', ') });
  }
};

exports.userSchema = userSchema;
exports.validate = validate;
