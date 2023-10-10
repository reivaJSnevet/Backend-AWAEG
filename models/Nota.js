import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { crear } from "../hooks/CrearSolicitud.js";

const Nota = db.define(
	"notas",
	{
		calificacion: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {
					msg: "la calificacion no puede estar vacia",
				},
				isInt: {
					msg: "la calificacion debe de ser un numero entero",
				},
				min: 0,
				max: 100,
			},
		},
		periodo: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: "El periodo no puede estar vacio",
				},
			},
		},
	},
	{
		hooks: {
			beforeCreate: async (nota) => {
				await crear(nota);
			},
		},
	},
);

export default Nota;
