import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { crear } from "../hooks/crearSolicitud.js";


const Nota = db.define(
	"notas",
	{
		calificacion: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {
					msg: "la calificacion no puede estar vacia",
				},
				isInt: {
					msg: "la calificacion debe de ser un numero entero",
				},
				min: 0,
				max: 100,
			},
		},
		periodo: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: "El periodo no puede estar vacio",
				},
			},
		},
	},
	{
		hooks: {
			beforeCreate: async (nota) => {
				await crear(nota);
			},

            beforeBulkCreate: async (nota) => {
                await crear(nota);
            }
		},
	},
);

Nota.beforeCreate(async (nota) => {
	const { estudianteId, materiaId, periodo} = nota;

	const notaExistente = await Nota.findOne({
		where: {
			estudianteId,
			materiaId,
			periodo
		}
	});

	if (notaExistente) {
		throw new Error("Un estudiante no puede tener 2 notas en una misma materia, en un mismo periodo")
	}

});


Nota.beforeBulkCreate(async (notas) => {
    for (const nota of notas) {
      const { estudianteId, materiaId, periodo} = nota;
  
      const notaExistente = await Nota.findOne({
        where: {
          estudianteId,
          materiaId,
          periodo,
        }
      });
  
      if (notaExistente) {
        throw new Error("Un estudiante no puede tener 2 notas en una misma materia, en un mismo periodo");
      }
    }
  });
  

export default Nota;
