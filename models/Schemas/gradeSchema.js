import Joi from "joi";

const gradeSchemaCreate = Joi.object({
    score: Joi.number().min(0).max(100).required(),
    period: Joi.string().valid("primero", "segundo", "tercero").required(),
    studentId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).required(),
    subjectId: Joi.number().integer().required(),
    functionaryId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).required(),

}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

const gradeSchemaUpdate = Joi.object({
    score: Joi.number().min(0).max(100).optional(),
    period: Joi.string().valid("primero", "segundo", "tercero").optional(),
    studentId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).optional(),
    subjectId: Joi.number().integer().optional(),
    
}).options({ allowUnknown: false }).messages({
        'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
    });

export { gradeSchemaCreate, gradeSchemaUpdate };