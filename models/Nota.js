import { DataTypes, INTEGER } from "sequelize";
import db from "../config/db.js"

const Nota = db.define(
    'notas', 
    {
        id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
            autoIncrement: true
        },
        calificacion: {
            type: DataTypes.INTEGER
        },
        periodo: {
            type: DataTypes.STRING
        },
        fechaSubida: {
            type: DataTypes.DATEONLY
        }
    }
);

export default Nota;