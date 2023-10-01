import { exit } from "node:process";
import db from "../config/db.js";
import { Rol, Usuario, Clase, Encargado, Grupo, Materia, Prematricula, Estudiante, Funcionario, Horario, Nota } from "../models/index.js";
import usuarios from "./usuarios.js";
import roles from "./roles.js";
import clases from "./clases.js";
import encargados from "./encargados.js";
import grupos from "./grupos.js";
import materias from "./materias.js";
import prematriculas from "./prematriculas.js";
import funcionarios from "./funcionarios.js";
import horarios from "./horarios.js";
import notas from "./notas.js";
import estudiantes from "./estudiantes.js";

const importarDatos = async () => {
	try {
		await db.authenticate();
		await db.sync();

		// Crea registros de roles
		await Rol.bulkCreate(roles);
		await Usuario.bulkCreate(usuarios);
		await Encargado.bulkCreate(encargados);
		await Funcionario.bulkCreate(funcionarios);
		await Materia.bulkCreate(materias);
		await Horario.bulkCreate(horarios);
		await Clase.bulkCreate(clases);
		await Grupo.bulkCreate(grupos);
		await Prematricula.bulkCreate(prematriculas);
		await Estudiante.bulkCreate(estudiantes);
		await Nota.bulkCreate(notas);


        console.log("Datos de roles generados correctamente");
		exit(0);
	} catch (error) {
		console.log(error);
		exit(1);
	}
};

if (process.argv[2] === "-i") {
	importarDatos();
}
