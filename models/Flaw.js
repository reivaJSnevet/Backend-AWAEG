import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Flaw = db.define(
    "Flaw",
    {
        flawId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        damageCategory: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 255],
                    msg: "La categoría de daño debe tener entre 1 y 255 caracteres",
                },
                is: {
                    args: /^[a-zA-Z ]+$/i,
                    msg: "La categoría de daño solo puede contener letras y espacios",
                },
                notEmpty: {
                    msg: "La categoría de daño no puede estar vacía",
                },
            },
        
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 255],
                    msg: "La descripción debe tener entre 1 y 255 caracteres",
                },
                is: {
                    args: /^[a-zA-Z ]+$/i,
                    msg: "La descripción solo puede contener letras y espacios",
                },
                notEmpty: {
                    msg: "La descripción no puede estar vacía",
                },
            },
        }
    },
    {
        
    }
);

export default Flaw;