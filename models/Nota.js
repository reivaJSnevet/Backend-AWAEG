import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Nota = db.define(
    'notas',
    {
        calificacion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        periodo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaSubida: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }

);
export default Nota;