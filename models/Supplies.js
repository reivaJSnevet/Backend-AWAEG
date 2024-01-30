import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Supplies = db.define(
    "Supplies",
    {
        suppliesId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                is: {
					args: /^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "The username can only contain letters, numbers and underscores",
				},
                notEmpty: {
                    msg: "The name can't be empty",
                },
                len: {
                    args: [3, 50],
                    msg: "The name must be between 3 and 50 characters",
                },
            },
        },
        price: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: "The price must be a number",
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                is: {
                    args: /^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/i,
                    msg: "The username can only contain letters, numbers and underscores",
                },
                notEmpty: {
                    msg: "The description can't be empty",
                },
            },
        },
        state: {
            type: DataTypes.ENUM("available", "unavailable"),
            allowNull: false,
            validate: {
                isIn: {
                    args: [["available", "unavailable"]],
                    msg: "The state must be available or unavailable",
                },
                notEmpty: {
                    msg: "The state can't be empty",
                },
            },
        },
    },
    {
        timestamps: true,
        paranoid: true,
    },
);

export default Supplies;