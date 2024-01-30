import { DataTypes } from "sequelize";
import db from "../config/db.js";

const LoanSupplies = db.define(
	"LoanSupplies",
	{
		loanSuppliesId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: {
					msg: "The quantity must be a number",
				},
				notEmpty: {
					msg: "The quantity can't be empty",
				},
				min: {
					args: [1],
					msg: "The quantity must be greater than 0",
				},
			},
		},
	},
	{
		timestamps: false,
		paranoid: true,
	},
);

export default LoanSupplies;
