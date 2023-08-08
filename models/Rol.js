import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Rol = db.define(
    'roles',
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nivelPrivilegio:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    }
)

export default Rol;