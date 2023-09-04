import { DataTypes, Op } from "sequelize";
import db from "../config/db.js";

const Clase = db.define("clases", {
  dia: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
    isDate: {
        msg: "El campo dia debe ser una fecha válida.",
      },
      isFutureDate(value) {
        if (value <= new Date()) {
          throw new Error("El campo dia debe ser una fecha futura.");
        }
      },
    },
  },
  horaInicio: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      isTime: {
        args: /^([01]\d|2[0-3]):([0-5]\d)$/, // Formato HH:MM
        msg: "El campo horaInicio debe ser una hora válida en formato HH:MM.",
      },
    },
  },
  horaSalida: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      isTime: {
        args: /^([01]\d|2[0-3]):([0-5]\d)$/, // Formato HH:MM
        msg: "El campo horaSalida debe ser una hora válida en formato HH:MM.",
      },
    },
  },
  leccion: {
    type: DataTypes.CHAR,
    validate: {
      isRomanNumeral(value) {
        const romanNumeralPattern = /^(I|II|III|IV|V|VI|VII|VIII)$/;

        if (!romanNumeralPattern.test(value)) {
          throw new Error(
            "El campo leccion debe ser un número romano del I al VIII."
          );
        }
      },
    },
  },
});

export default Clase;
