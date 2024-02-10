import { DataTypes, Op } from "sequelize";
import db from "../config/db.js";

const Functionary = db.define(
	"Functionary",
	{
		functionaryId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
		},
		degree: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La titulación no puede estar vacía",
				},
				len: {
					args: [1, 50],
					msg: "La titulación debe tener entre 1 y 50 caracteres",
				},
			},
		},
		position: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La posición no puede estar vacía",
				},
				len: {
					args: [1, 50],
					msg: "La posición debe tener entre 1 y 50 caracteres",
				},
			},
		},
		yearsService: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Los años de servicio no pueden estar vacíos",
				},
				isInt: {
					msg: "Los años de servicio deben ser un número entero",
				},
			},
		},
		specialty: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La especialidad no puede estar vacía",
				},
				len: {
					args: [1, 50],
					msg: "La especialidad debe tener entre 1 y 50 caracteres",
				},
			},
		},
		professionalGroup: {
			type: DataTypes.STRING(10),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El grupo profesional no puede estar vacío",
				},
				len: {
					args: [1, 10],
					msg: "El grupo profesional debe tener entre 1 y 10 caracteres",
				},
			},
		},
		phoneNumber: {
			type: DataTypes.STRING(8),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El número de teléfono no puede estar vacío",
				},
				len: {
					args: [8, 8],
					msg: "El número de teléfono debe tener 8 caracteres",
				},
				is: {
					args: /^[0-9]+$/i,
					msg: "El número de teléfono debe ser un número válido",
				},
			},
		},
	},
	{
		timestamps: true,
		paranoid: true,
		defaultScope: {
			attributes: {
				exclude: ["createdAt", "updatedAt", "deletedAt"],
			},
		},
		scopes: {
			administration: {
				where: {
					deletedAt: {
						[Op.or]: [
							null,
							{
								[Op.not]: null,
							},
						],
					},
				},
			},
		},
	},
);

export default Functionary;
