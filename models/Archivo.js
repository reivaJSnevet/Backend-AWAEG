import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Archivo = db.define("archivos", {
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	tipo: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	estado: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
},{
    hooks:{
        beforeCreate:  async (archivo) => {
            await crear(archivo)
        }
    }
});

export default Archivo;
