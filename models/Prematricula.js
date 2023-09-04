import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Prematricula = db.define("prematriculas", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	estado: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	grado: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	fechEnvio: DataTypes.DATEONLY,
	fechRevision: DataTypes.DATEONLY,
});

export default Prematricula;
