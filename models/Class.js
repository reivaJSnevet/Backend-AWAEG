import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Group from "./Group.js";

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
			beforeCreate: async (classInstance) => {
				await matchShift(classInstance);
			},
			beforeUpdate: async (classInstance) => {
				await matchShift(classInstance);
			},
		},
	},
);

export default Class;

//Hooks

const matchShift = async (classInstance) => {
	try {
		const group = await Group.findByPk(classInstance.section);

		if (group.shift !== classInstance.shift) {
			throw new Error(
				"The shift of the group and the class must be the same",
			);
		}
	} catch (error) {
		throw error;
	}
};
