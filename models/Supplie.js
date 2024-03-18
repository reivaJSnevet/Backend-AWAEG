import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Supplie = db.define("Supplie", {
    supplieId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
    state: {
        type: DataTypes.ENUM("activo", "inactivo"),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            isIn: {
                args: [["activo", "Inactivo"]],
                msg: "El estado debe ser 'activo' o 'inactivo'",
            },
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
});

export default Supplie;