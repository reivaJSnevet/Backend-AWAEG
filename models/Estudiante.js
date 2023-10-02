import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Grupo from "./Grupo.js";

const Estudiante = db.define(
	"estudiantes",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			validate: {
				esCedulaValida: (cedula) => {
					const patron = /^(?:[1-8]|1558)\d{8}$/;
					if (!patron.test(cedula)) {
						throw new Error(
							"El número de cedula no cumple con el formato requerido",
						);
					}
				},
			},
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlpha: {
					msg: "El nombre solo puede contener letras. Es obligatorio.",
				},
			},
		},
		apellido1: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlpha: {
					msg: "El primer apellido solo puede contener letras. Es obligatorio.",
				},
			},
		},
		apellido2: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlpha: {
					msg: "El segundo apellido solo puede contener letras. Es obligatorio.",
				},
			},
		},
		fechaNacimiento: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				isDate: {
					msg: "La fecha no es valida",
				},
			},
		},
		edad: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		sexo: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			validate: {
				isIn: {
					args: [[true, false]],
					msg: "El campo sexo solo puede ser true o false",
				},
			},
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La direccion no puede estar vacia. Es obligatoria.",
				},
			},
		},
		seccion: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				esSeccionValida: (value) => {
					const patron = /^[1-6]-\d+$/;
					if (!patron.test(value)) {
						throw new Error(
							'La seccion debe tener el formato "m-n", donde m es igual a un numero entre 1 y 6',
						);
					}
				},
			},
		},
	},
	{
		hooks: {
			beforeCreate: (estudiante) => calcularEdad(estudiante),
            beforeBulkCreate: (estudiantes) => { estudiantes.forEach(estudiante => calcularEdad(estudiante))},
			beforeUpdate: (estudiante) => calcularEdad(estudiante),
            afterCreate: (estudiante) => actualizarCantidadEstudiantes(estudiante.seccion, 1),
            afterBulkCreate: (estudiantes) => { estudiantes.forEach(estudiante => actualizarCantidadEstudiantes(estudiante.seccion, 1))},
            beforeDestroy: (estudiante) => actualizarCantidadEstudiantes(estudiante.seccion, -1),
		},
	},
);

const calcularEdad = (estudiante) => {
	const nacimiento = new Date(estudiante.fechaNacimiento);
	const hoy = new Date();

	let edadExacta = hoy.getFullYear() - nacimiento.getFullYear();

	// Ajustamos la edad si el cumpleaños aún no ha ocurrido este año
	if (
		nacimiento.getMonth() > hoy.getMonth() ||
		(nacimiento.getMonth() === hoy.getMonth() &&
			nacimiento.getDate() >= hoy.getDate())
	) {
		edadExacta--;
	}

	estudiante.setDataValue("edad", edadExacta);
};

const actualizarCantidadEstudiantes = async (seccion, cantidad) => {
    if (seccion) {
      const grupo = await Grupo.findByPk(seccion);
      if (grupo) {
        grupo.increment("cantAlumno", { by: cantidad });
      }
    }
  };

export default Estudiante;
