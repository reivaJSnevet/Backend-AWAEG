import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Grade = db.define(
	"Grade",
	{
		gradeId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		score: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: {
					msg: "La calificación debe ser un número",
				},
				min: {
					args: [0],
					msg: "La calificación debe ser mayor o igual a 0",
				},
				max: {
					args: [100],
					msg: "La calificación debe ser menor o igual a 100",
				},
			},
		},
		period: {
			type: DataTypes.ENUM("primero", "segundo", "tercero"),
			allowNull: false,
			validate: {
				isIn: {
					args: [["primero", "segundo", "tercero"]],
					msg: "El periodo debe ser primero, segundo o tercero",
				},
			},
			set(value) {
				this.setDataValue("period", value.toLowerCase());
			},
		},
	},
	{
		timestamps: true,
		paranoid: true,
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
	},
);

export default Grade;
