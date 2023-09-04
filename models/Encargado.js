import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Encargado = db.define("encargados", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		validate: {
			esCedulaValida: (cedula) => {
				const patron = /^(?:[1-8]|1558)\d{8}$/;
				if (!patron.test(cedula)) {
					throw new Error(
						"El número de cedula no cumple con el formato requerido",
					);
				}
			},
		},
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "El nombre no puede estar vacío",
			},
		},
	},
	apellido1: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "El apellido1 no puede estar vacío",
			},
		},
	},

	apellido2: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "El apellido2 no puede estar vacío",
			},
		},
	},
});

export default Encargado;
