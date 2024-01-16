import Joi from "joi";

const appointmentSchemaCreate = Joi.object({
    date: Joi.date().greater('now').required(),
    hour: Joi.string().required(),
    duration: Joi.number().integer().min(15).max(60).required(),
    location: Joi.string().pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ,:"-]+$/i).required(),
    description: Joi.string().max(255).pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ-]+$/i).optional(),
    functionaryId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).required(),
    studentId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).optional(),

}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

const appointmentSchemaUpdate = Joi.object({
    date: Joi.date().greater('now').optional(),
    hour: Joi.string().optional(),
    duration: Joi.number().integer().min(15).max(60).optional(),
    location: Joi.string().pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ,:"-]+$/i).optional(),
    description: Joi.string().max(255).pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ-]+$/i).optional(),
    functionaryId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).optional(),
    
}).options({ allowUnknown: false }).messages({
        'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
    });

export { appointmentSchemaCreate, appointmentSchemaUpdate };