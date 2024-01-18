import Joi from "joi";

const loginSchema = Joi.object({
    userName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
    password: Joi.string().min(8).max(255).required(),

}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });


export { loginSchema };