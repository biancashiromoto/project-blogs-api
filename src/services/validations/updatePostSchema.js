const Joi = require('joi');

const updatePostSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Some required fields are missing',
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Some required fields are missing',
  }),
});

module.exports = updatePostSchema;