import { DataTypes } from "sequelize";
import db from "../config/db.js";


const CateInsumo = db.define("cateInsumo", {
    nombreCateInsumo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El nombre de la categoria no puede estar vacio"
            }
        }
    },
    descripcionCateInsumo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "La descripcion no puede estar vacia"
            }
        }
    }
});

//Realacion



export default CateInsumo;