import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { isSpanishAlpha } from "./validations/spanishAlphanumeric.js";
import { isCostaRicanId } from "./validations/isCostaRicanId.js";
import calculateAge from "../hooks/calculateAgeHook.js";

const Person = db.define(
	"Person",
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true,
			validate: {
				isCostaRicanId: isCostaRicanId,
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El nombre no puede estar vacío",
				},
				len: {
					args: [1, 50],
					msg: "El nombre debe tener entre 1 y 50 caracteres",
				},
				isSpanishAlpha: isSpanishAlpha,
			},
		},
		middleName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El primer apellido no puede estar vacío",
				},
				len: {
					args: [1, 50],
					msg: "El primer apellido debe tener entre 1 y 50 caracteres",
				},
				isSpanishAlpha: isSpanishAlpha,
			},
		},
		lastName2: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El segundo apellido no puede estar vacío",
				},
				len: {
					args: [1, 50],
					msg: "El segundo apellido debe tener entre 1 y 50 caracteres",
				},
				isSpanishAlpha: isSpanishAlpha,
			},
		},
		birthDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La fecha de nacimiento no puede estar vacía",
				},
				isDate: {
					msg: "La fecha de nacimiento debe ser una fecha válida",
				},
			},
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		gender: {
			type: DataTypes.ENUM("M", "F"),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El género no puede estar vacío",
				},
				isIn: {
					args: [["M", "F"]],
					msg: "El género debe ser M o F (M para masculino, F para femenino)",
				},
			},
		},
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La dirección no puede estar vacía",
                },
                len: {
                    args: [1, 255],
                    msg: "La dirección debe tener entre 1 y 255 caracteres",
                },
            },
        },
        type:{
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El tipo no puede estar vacío",
                },
                len: {
                    args: [1, 20],
                    msg: "El tipo debe tener entre 1 y 20 caracteres",
                },
            },
                
        }
	},
	{
		timestamps: true,
		paranoid: true,
		defaultScope: {
			attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
		},
		hooks: {
			beforeValidate: (person) => {
				if (person.birthDate) {
					calculateAge(person);
				}
			},
			beforeBulkCreate: (students) => {
				students.forEach((person) => {
					calculateAge(person);
				});
			},
			beforeUpdate: async (person) => {
				if (person.birthDate) {
					calculateAge(person);
				}
			},
		},
	},
);


export default Person;