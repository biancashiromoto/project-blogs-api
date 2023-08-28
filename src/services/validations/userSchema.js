const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.empty': '"displayName" is required',
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': '"email" is required',
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': '"password" is required',
    'string.min': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

module.exports = { userSchema };