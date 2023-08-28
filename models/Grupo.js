import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Grupo = db.define(
    'grupos',
    {
        seccion: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        ciclo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        grado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        aula: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cantAlumno: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        turno: {
            type: DataTypes.BOOLEAN
        }
    }

);
export default Grupo;