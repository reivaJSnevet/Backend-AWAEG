import { DataTypes} from "sequelize";
import db from "../config/db.js";

const Clase = db.define("clases", {
	dia: {
		type: DataTypes.STRING, // Almacena el día como una cadena de texto
		allowNull: false,
		validate: {
			isIn: {
				args: [
					[
						"lunes",
						"martes",
						"miércoles",
						"jueves",
						"viernes",
					],
				],
				msg: "El campo dia debe ser un día válido [lunes, martes, miércoles, jueves, viernes].",
			},
		},
	},
	horaInicio: {
		type: DataTypes.TIME,
		allowNull: false,
		validate: {
			isTime: {
				args: /^([01]\d|2[0-3]):([0-5]\d)$/, // Formato HH:MM
				msg: "El campo horaInicio debe ser una hora válida en formato HH:MM.",
			},
		},
	},
	horaSalida: {
		type: DataTypes.TIME,
		allowNull: false,
		validate: {
			isTime: {
				args: /^([01]\d|2[0-3]):([0-5]\d)$/, // Formato HH:MM
				msg: "El campo horaInicio debe ser una hora válida en formato HH:MM.",
			},
		},
	},
	leccion: {
		type: DataTypes.CHAR,
		validate: {
			isRomanNumeral(value) {
				const romanNumeralPattern = /^(I|II|III|IV|V|VI|VII|VIII)$/;

				if (!romanNumeralPattern.test(value)) {
					throw new Error(
						"El campo leccion debe ser un número romano del I al VIII.",
					);
				}
			},
		},
	},
});

export default Clase;
