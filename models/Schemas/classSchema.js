import Joi from "joi";

const classSchemaCreate = Joi.object({
    shift: Joi.string().valid("matutino", "vespertino").required(),
    section: Joi.string().pattern(/^[1-6]-[A-Za-z0-9]+$/).required(),
    subjectId: Joi.number().integer().required(),
    functionaryId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).required(),
    Timetables: Joi.array().items(Joi.object({
        day: Joi.string().valid("lunes", "martes", "miércoles", "jueves", "viernes").required(),
        startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
        endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
        lesson: Joi.string().valid("I", "II", "III", "IV", "V", "VI", "VII", "VIII").required(),
    })).required(),

}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

const classSchemaUpdate = Joi.object({
    shift: Joi.string().valid("matutino", "vespertino").optional(),
    section: Joi.string().pattern(/^[1-6]-[A-Za-z0-9]+$/).optional(),
    subjectId: Joi.number().integer().optional(),
    functionaryId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).optional(),
    
}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
    });

export { classSchemaCreate, classSchemaUpdate };