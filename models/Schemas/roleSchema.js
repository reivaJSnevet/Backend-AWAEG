import Joi from "joi";

const roleSchemaCreate = Joi.object({
    roleName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
    privilegeLevel: Joi.number().integer().min(1).max(5).required(),
    description: Joi.string().min(1).max(255).pattern(/^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

const roleSchemaUpdate = Joi.object({
    roleName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    privilegeLevel: Joi.number().integer().min(1).max(5).optional(),
    description: Joi.string().min(1).max(255).pattern(/^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

export { roleSchemaCreate, roleSchemaUpdate };

