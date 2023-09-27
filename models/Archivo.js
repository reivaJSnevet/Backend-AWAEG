import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Archivo = db.define("archivos", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	tipo: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	fechaPublicacion: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	estado: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	idFuncionario: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: "funcionarios",
			key: "id",
		},
	},
});

export default Archivo;
