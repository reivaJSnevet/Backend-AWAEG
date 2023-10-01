import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Grupo = db.define("grupos", {
	seccion: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
		validate: {
			esSeccionValida: (value) => {
				const patron = /^[1-6]-\d+$/;
				if (!patron.test(value)) {
					throw new Error(
						'La seccion debe tener el formato "m-n", donde m es igual a un numero entre 1 y 6',
					);
				}
			},
		},
	},
	ciclo: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "El ciclo no puede estar vacio",
			},
		},
	},
	grado: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "El grado no puede estar vacio",
			},
		},
	},
	aula: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "El aula no puede estar vacio",
			},
		},
	},
	cantAlumno: {
		type: DataTypes.INTEGER,
		allowNull: true,
        defaultValue: 0,
	},
	turno: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
});

export default Grupo;
