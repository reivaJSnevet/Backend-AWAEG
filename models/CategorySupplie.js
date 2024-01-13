import { DataTypes } from "sequelize";
import db from "../config/db.js";

const CategorySupplie = db.define(
    "CategorySupplie",
    {
        supplieId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "The name must be between 1 and 50 characters long",
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
        description : {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "The description must be between 1 and 50 characters long",
                },
                is: {
                    args: /^[a-zA-Z ]+$/i,
                    msg: "The description can only contain letters and spaces",
                },
                notEmpty: {
                    msg: "The description can't be empty",
                },
            },
        },
        
    },
    {
        timestamps: false,
    }
);

export default CategorySupplie;