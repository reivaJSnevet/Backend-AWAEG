import { DataTypes } from "sequelize";
import db from "../config/db";

const Funcionario = db.define(
    'funcionarios',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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