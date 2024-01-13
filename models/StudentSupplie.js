import { DataTypes } from "sequelize";
import db from "../config/db.js";

const StudentSupplie = db.define(
    "StudentSupplie",
    {
        studentSupplieId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 255],
                    msg: "The name must be between 1 and 255 characters long",
                },
                is: {
                    args: /^[a-zA-Z ]+$/i,
                    msg: "The name can only contain letters and spaces",
                },
                notEmpty: {
                    msg: "The name can't be empty",
                },
            },
            
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isDecimal: {
                    args: [1, 255],
                    msg: "The price must be between 1 and 255 characters long",
                },
                notEmpty: {
                    msg: "The price can't be empty",
                },
            }
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                isDecimal: {
                    args: [1, 255],
                    msg: "The amount must be between 1 and 255 characters long",
                },
                notEmpty: {
                    msg: "The amount can't be empty",
                },
            }
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 255],
                    msg: "The brand must be between 1 and 255 characters long",
                },
                is: {
                    args: /^[a-zA-Z ]+$/i,
                    msg: "The brand can only contain letters and spaces",
                },
                notEmpty: {
                    msg: "The brand can't be empty",
                },
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 255],
                    msg: "The description must be between 1 and 255 characters long",
                },
                is: {
                    args: /^[a-zA-Z ]+$/i,
                    msg: "The description can only contain letters and spaces",
                },
                notEmpty: {
                    msg: "The description can't be empty",
                },
            }
        },
        
    }
);

export default StudentSupplie;