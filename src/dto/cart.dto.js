import Joi from 'joi';

export const cartSchemaJoi = Joi.object({
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().hex().length(24).required(),
      quantity: Joi.number().integer().min(1).required()
    })
  ).min(1).required() 
});