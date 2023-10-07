import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Solicitud = db.define("solicitudes", {
	estado: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
        defaultValue: false,
	},
});

export default Solicitud;