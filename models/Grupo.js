import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Grupo = db.define(
    'grupos',
    {
        seccion: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                isValidSeccion: function (value) {
                    if (!/^[1-6]-$/.test(value)) {
                        throw new Error(
                            "La seccion debe de tener el formato 'm-n', donde m es igual a un numero entre el 1 al 6"
                        )
                    }
                }
            }
        },
        ciclo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El ciclo no puede estar vacio"
                }
            }
        },
        grado: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El grado no puede estar vacio"
                }
            }
        },
        aula: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El ciclo no puede estar vacio"
                }
            }
        },
        cantAlumno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La cantidad de estudiantes no puede estar vacia"
                },
                isInt: {
                    msg: "La cantidad de alumnos debe de ser un numero entero"
                }
            }
        },
        turno: {
            type: DataTypes.BOOLEAN
        }
    }

);
export default Grupo;