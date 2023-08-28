import { DataTypes } from "sequelize";
import db  from "../config/db.js";

const Encargado = db.define(
    'encargados',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido2: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

export default Encargado;