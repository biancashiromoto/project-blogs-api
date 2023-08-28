const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': '"displayName" is required',
  }),
});

module.exports = { categorySchema };