import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Prematricula = db.define(
	"prematriculas",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		estado: {
			type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue: 0,
		},
		grado: {
			type: DataTypes.INTEGER,
			allowNull: false,
            validate: {
                isInt:{
                    msg: "El grado debe ser un número entero"
                },
                isIn:{
                    args: [[1,2,3,4,5,6]],
                    msg: "El grado debe ser un número entre 1 y 6"
                }
            },
		},
	},
);

export default Prematricula;
