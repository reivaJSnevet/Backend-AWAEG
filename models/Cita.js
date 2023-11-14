import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { crear } from "../hooks/crearSolicitud.js";

const Cita = db.define(
	"citas",
	{
		dia: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				isDate: {
					msg: "El campo dia debe ser una fecha válida",
				},
				isAfter: {
					args: new Date().toString(),
					msg: "El campo dia debe ser una fecha posterior a la actual",
				},
			},
		},
		asunto: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: "El campo asunto no puede estar vacio",
				},
			},
		},
		duracion: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: "El campo duracion no puede estar vacio",
				},
				isInt: {
					msg: "El campo duracion debe ser un numero entero",
				},
				min: {
					args: 1,
					msg: "El campo duracion debe ser mayor a 0",
				},
			},
		},
		ubicacion: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: "El campo ubicacion no puede estar vacio",
				},
			},
		},
	},
	{
		hooks: {
			beforeCreate: async (cita) => {
				await crear(cita);
			},
		},
	},
);

export default Cita;
