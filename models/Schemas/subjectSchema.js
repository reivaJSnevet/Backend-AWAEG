import Joi from "joi";

const subjectSchemaCreate = Joi.object({
    subjectName: Joi.string().min(3).max(50).pattern(/^[a-zA-Z0-9_ .áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),

}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

const subjectSchemaUpdate = Joi.object({
    subjectName: Joi.string().min(3).max(50).pattern(/^[a-zA-Z0-9_ .áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),

}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

export { subjectSchemaCreate, subjectSchemaUpdate };