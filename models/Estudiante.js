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
				notEmpty: {
					msg: "El nombre no puede estar vacío",
				},
			},
		},
		apellido1: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El primer apellido no puede estar vacío",
				},
			},
		},
		apellido2: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El segundo apellido no puede estar vacío",
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
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La dirección no puede estar vacía",
				},
			},
		},
		seccion: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		hooks: {
			beforeCreate: (estudiante) => calcularEdad(estudiante),
			beforeUpdate: (estudiante) => calcularEdad(estudiante),
            afterCreate: (estudiante) => actualizarCantidadEstudiantes(estudiante.seccion, 1),
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
