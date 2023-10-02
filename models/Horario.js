import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Horario = db.define("horarios", {
	provisional: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
		validate: {
			isIn: {
				args: [[true, false]],
				msg: "El campo provisional debe ser un booleano.",
			},
		}
	},
	habilitado: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
		validate: {
			isIn: {
				args: [[true, false]],
				msg: "El campo habilitado debe ser un booleano.",
			},
		}
	},
});
export default Horario;
