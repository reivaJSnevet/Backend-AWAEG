import Joi from "joi";

const studentSchemaCreate = Joi.object({
    studentId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).required(),
    name: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
    middleName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    lastName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
    lastName2: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    birthDate: Joi.date().required(),
    gender: Joi.string().valid("M", "F").required(),
    address: Joi.string().min(1).max(255).pattern(/^[a-zA-Z0-9_ ,#áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
    section: Joi.string().pattern(/^[1-6]-\d+$/).optional(),
    caregiverId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).required(),
    userName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

const studentSchemaUpdate = Joi.object({
    name: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    middleName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    lastName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    lastName2: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    birthDate: Joi.date().optional(),
    gender: Joi.string().valid("M", "F").optional(),
    address: Joi.string().min(1).max(255).pattern(/^[a-zA-Z0-9_ #áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    section: Joi.string().pattern(/^[1-6]-\d+$/).optional(),
    caregiverId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).optional(),
    userName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
    });

export { studentSchemaCreate, studentSchemaUpdate };