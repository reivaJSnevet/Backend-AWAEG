import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Class = db.define(
	"Class",
	{
		classId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		shift: {
			type: DataTypes.ENUM("matutino", "vespertino"),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "The shift can't be empty",
				},
				isIn: {
					args: [["matutino", "vespertino"]],
					msg: "The shift must be matutino or vespertino",
				},
				set(value) {
					this.setDataValue("shift", value.toLowerCase());
				},
			},
		},
	},
	{
		timestamps: true,
		defaultScope: {
			attributes: { exclude: ["createdAt", "updatedAt"] },
		},
        hooks: {
            //avoid overlapping classes

        }
	},
);

export default Class;