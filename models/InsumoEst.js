import { DataTypes } from "sequelize";
import db from "../config/db.js";
import CateInsumo from "./CateInsumo.js";

const InsumoEst = db.define("insumoEst", {
    nombreInsumoEst: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El nombre del insumo no puede estar vacio"
            }
        }
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            isIn: {
                args: [[true, false]],
                msg: "El campo disponible solo puede ser true o false"
            }
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: {
                msg: "La cantidad debe ser un numero"
            }
        }
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "La descripcion no puede estar vacia"
            }
        }
    },
},


);

//Relacion
CateInsumo.hasMany(InsumoEst);
InsumoEst.belongsTo(CateInsumo);

export default InsumoEst;