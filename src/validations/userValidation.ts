import Joi from "joi";

export const schema = Joi.object({
  userName: Joi.string().required().messages({
    "any.required": "User name is a required field",
    "string.empty": "User name can't be an empty string or nullable value",
    "string.base": "User name should be a string value",
  }),
  password: Joi.string().required().min(10).messages({
    "any.required": "Password is a required field",
    "string.empty": "Password can't be an empty string or nullable value",
    "string.min": "Password should be at least minimun of 10 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email can't be an empty string or nullable value",
    "string.email": "Email needs to have a valid format(example@domain.com)",
    "any.required": "Email is a required field",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email can't be an empty string or nullable value",
    "string.email": "Email needs to have a valid format(example@domain.com)",
    "any.required": "Email is a required field",
  }),
  password: Joi.string().required().min(10).messages({
    "any.required": "Password is a required field",
    "string.empty": "Password can't be an empty string or nullable value",
    "string.min": "Password should be at least minimun of 10 characters",
  }),
});
