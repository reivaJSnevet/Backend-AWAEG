import Joi from "joi";

const caregiverSchemaCreate = Joi.object({
    caregiverId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).required(),
    name: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
    middleName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    lastName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).required(),
    lastName2: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    phoneNumber: Joi.string().min(8).max(8).pattern(/^[0-9]+$/).required(),
    gender: Joi.string().valid('M', 'F').required(),
    relationTo: Joi.string().valid('Padre', 'Madre', 'Hermano', 'Hermana', 'Tío', 'Tía', 'Abuelo', 'Abuela', 'Padrasto, Madrastra').required(),

}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

const caregiverSchemaUpdate = Joi.object({
    name: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    middleName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    lastName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    lastName2: Joi.string().min(1).max(50).pattern(/^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/).optional(),
    phoneNumber: Joi.string().min(8).max(8).pattern(/^[0-9]+$/).optional(),
    gender: Joi.string().valid('M', 'F').optional(),
    relationTo: Joi.string().valid('Padre', 'Madre', 'Hermano', 'Hermana', 'Tío', 'Tía', 'Abuelo', 'Abuela', 'Padrasto, Madrastra').optional(),

}).options({ allowUnknown: false }).messages({
    "object.unknown": "Invalid key {{#label}}: {{#childkey}}",
});

export { caregiverSchemaCreate, caregiverSchemaUpdate };