import joi from 'joi';

import Joi from 'joi';

export const productValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'Product name is required',
    }),

  description: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'Description is required',
    }),

  price: Joi.number()
    .precision(2)
    .positive()
    .required()
    .messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be greater than zero',
    }),

  category: Joi.string()
    .required()
    .messages({
      'string.empty': 'Category is required',
    }),

  stock: Joi.number()
    .integer()
    .min(0)
    .default(0),

  images: Joi.array()
    .items(Joi.string().uri())
    .messages({
      'string.uri': 'Each image must be a valid URL',
    }),

  // Validates that the ID follows the MongoDB ObjectId format
  createdBy: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message('Invalid User ID format'),
});

