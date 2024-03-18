import { DataTypes } from "sequelize";
import db from "../config/db.js";

const ElectronicSupplies = db.define("ElectronicSupplies", {
	serialNumber: {
		type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
		validate: {
			len: [3, 20],
			notEmpty: true,
			notNull: true,
			isAlphanumeric: true,
		},
	},
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 20],
            notEmpty: true,
            notNull: true,
        },
    },
	brand: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [3, 20],
			notEmpty: true,
			notNull: true,
		},
	},
	model: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [3, 20],
			notEmpty: true,
			notNull: true,
		},
	},
	wifi: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		validate: {
			notEmpty: true,
			notNull: true,
		},
	},
	bluetooth: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		validate: {
			notEmpty: true,
			notNull: true,
		},
	},
});

export default ElectronicSupplies;
