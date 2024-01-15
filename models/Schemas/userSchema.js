import Joi from "joi";

const userSchemCreate = Joi.object({   
    userName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
    email: Joi.string().email().pattern(/^[a-zA-Z0-9_.@áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
    password: Joi.string().min(8).max(255).required(),
    roleId: Joi.number().integer().required(),
}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

const userSchemaUpdate = Joi.object({
    email: Joi.string().email().optional(),
    password: Joi.string().min(8).max(255).optional(),
    roleId: Joi.number().integer().optional(),
    verifyEmail: Joi.boolean().optional(),
    token: Joi.string().optional(),
    refreshToken: Joi.string().optional(),
    recoveryToken: Joi.string().optional(),

}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

export { userSchemCreate, userSchemaUpdate };