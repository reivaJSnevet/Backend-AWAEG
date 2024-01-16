import Joi from "joi";

const groupSchemaCreate = Joi.object({
    section: Joi.string().pattern(/^[1-6]-[A-Za-z0-9]+$/).required(),
    grade: Joi.string().valid("materno", "transición", "primero", "segundo", "tercero", "cuarto", "quinto", "sexto").required(),
    classRoom: Joi.string().required(),
    shift: Joi.string().valid("matutino", "vespertino").required(),
    functionaryId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).optional(),
}).options({ allowUnknown: false }).messages({
    'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
  });


const groupSchemaUpdate = Joi.object({
    grade: Joi.string().valid("materno", "transición", "primero", "segundo", "tercero", "cuarto", "quinto", "sexto").optional(),
    classRoom: Joi.string().optional(),
    shift: Joi.string().valid("matutino", "vespertino").optional(),
    functionaryId: Joi.string().pattern(/^(?:[1-8]|1558)\d{8}$/).optional(),

}).options({ allowUnknown: false }).messages({
        'object.unknown': 'Invalid key {{#label}}: {{#childkey}}',
    });

export { groupSchemaCreate, groupSchemaUpdate };