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
					msg: "The score must be a number",
				},
				min: {
					args: [0],
					msg: "The score must be greater than 0",
				},
				max: {
					args: [100],
					msg: "The score must be less than 100",
				},
			},
		},
		period: {
			type: DataTypes.ENUM("primero", "segundo", "tercero"),
			allowNull: false,
			validate: {
				isIn: {
					args: [["primero", "segundo", "tercero"]],
					msg: "The period must be primero, segundo or tercero",
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
