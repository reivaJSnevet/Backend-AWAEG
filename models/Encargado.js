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
							"El campo cédula debe tener un formato valido (empezar con un numero entre 1-7). Ej: 503578628.",
						);
					}
				},
			},
		
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isAlpha: {
				msg: "El nombre solo puede contener letras. Es obligatorio.",
			},
		},
	},
	apellido1: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isAlpha: {
				msg: "El apellido1 solo puede contener letras. Es obligatorio.",
			},
		},
	},

	apellido2: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isAlpha: {
				msg: "El apellido2 solo puede contener letras. Es obligatorio.",
			},
		},
	},
});

export default Encargado;