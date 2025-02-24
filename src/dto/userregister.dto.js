import Joi from "joi";

export const registerDto = Joi.object({
  first_name: Joi.string().min(3).max(30).required(),
  last_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(18).max(100).required(),
  password: Joi.string().min(6).max(50).required(),
});

export default registerDto;