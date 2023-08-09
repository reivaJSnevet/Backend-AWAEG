import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Estudiante = db.define(
    'estudiantes',
    {   
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
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
            allowNull: true,
        },
        sexo: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }

    },
    {
        hooks:{

            beforeCreate: (estudiante) => {
                const nacimiento = new Date(estudiante.fechaNacimiento);
                const hoy = new Date();
                const edadCalculada = hoy.getFullYear() - nacimiento.getFullYear();   
                const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
                

                
                const edadAjustada = nacimiento > hoySinHora ? edadCalculada - 1 : edadCalculada;

                estudiante.setDataValue('edad', edadAjustada);
            },

        }
    }
);
export default Estudiante;