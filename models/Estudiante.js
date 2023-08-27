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
        },
        direccion:{
            type: DataTypes.STRING,
            allowNull: false
        }

    },
    {
        hooks:{

            beforeCreate: (estudiante) => {

                const nacimiento = new Date(estudiante.fechaNacimiento);
                const hoy = new Date();
                
                let edadExacta = hoy.getFullYear() - nacimiento.getFullYear();
              
                // Ajustamos la edad si el cumpleaños aún no ha ocurrido este año
                if (nacimiento.getMonth() > hoy.getMonth() || (nacimiento.getMonth() === hoy.getMonth() && nacimiento.getDate() >= hoy.getDate())) {
                  edadExacta--;
                }

                estudiante.setDataValue('edad', edadExacta);
            },
        }
    }
);
export default Estudiante;