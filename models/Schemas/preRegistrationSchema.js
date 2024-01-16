import Joi from "joi";

const preRegistrationSchemaCreate = Joi.object({
    grade: Joi.string().valid(
        "materno",
        "transición",
        "primero",
        "segundo",
        "tercero",
        "cuarto",
        "quinto",
        "sexto",
    ).required(),
    studentId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).required(),

}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });

const preRegistrationSchemaUpdate = Joi.object({
    grade: Joi.string().valid(
        "materno",
        "transición",
        "primero",
        "segundo",
        "tercero",
        "cuarto",
        "quinto",
        "sexto",
    ).optional(),
        
}).options({ allowUnknown: false }).messages({
        'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
    });

export { preRegistrationSchemaCreate, preRegistrationSchemaUpdate };
