import Joi from "joi";

const functionarySchemaCreate = Joi.object({
    functionaryId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).required(),
    name: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
    middleName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    lastName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
    lastName2: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    birthDate: Joi.date().required(),
    gender: Joi.string().valid("M", "F").required(),
    address: Joi.string().min(1).max(255).pattern(/^[a-zA-Z0-9_ ,#áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
    userName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),

}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

const functionarySchemaUpdate = Joi.object({
    name: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    middleName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    lastName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    lastName2: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    birthDate: Joi.date().optional(),
    gender: Joi.string().valid("M", "F").optional(),
    address: Joi.string().min(1).max(255).pattern(/^[a-zA-Z0-9_ #áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    userName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),

}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
    });

const functionarySubjectSchema = Joi.object({
    subjectId: Joi.array().items(Joi.number().required()).required(),

}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
    });

export { functionarySchemaCreate, functionarySchemaUpdate, functionarySubjectSchema };