import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Materia = db.define("materias", {
	nombre: {
		type: DataTypes.STRING,
		unique: {
			msg: "Este nombre de materia ya está en uso.",
		},
		validate: {
			notEmpty: {
				msg: "La materia no puede estar vacía.",
			},
		},
	},
});

export default Materia;
