const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Some required fields are missing',
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Some required fields are missing',
  }),
  categoryIds: Joi.array().required().messages({
    'string.empty': 'one or more "categoryIds" not found',
  }),
});

module.exports = postSchema;