import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Funcionario = db.define(
    'funcionarios',
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
        },
        fechaNacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sexo: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
);

export default Funcionario;