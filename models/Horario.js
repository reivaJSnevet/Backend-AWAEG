import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Horario = db.define("horarios", {
	provisional: {
		type: DataTypes.BOOLEAN,
	},
	habilitado: {
		type: DataTypes.BOOLEAN,
	},
});
export default Horario;
