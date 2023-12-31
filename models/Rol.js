import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Rol = db.define(
	"roles",
	{
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
            unique: true,
			validate: {
				notEmpty: {
					msg: "El nombre no puede estar vacío",
				},
			},
		},
		nivelPrivilegio: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: {
					msg: "El nivel de privilegio debe ser un número entero",
				},
                isIn: {
                    args: [[1, 2, 3, 4, 5]],
                    msg: "El nivel de privilegio debe estar entre 1 y 5"
                }
			},
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La descripción no puede estar vacía",
				},
			},
		},
	},
	{
		timestamps: false,
	},
);

export default Rol;
