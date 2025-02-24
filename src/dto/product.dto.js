import Joi from 'joi';

export const productSchemaJoi = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  price: Joi.number().min(0).precision(2).required(),
  thumbnail: Joi.string().uri().optional(), 
  code: Joi.string().alphanum().min(3).max(20).required(),
  stock: Joi.number().integer().min(0).required(),
  status: Joi.boolean().default(true),
  category: Joi.string().min(3).max(50).required()
});
