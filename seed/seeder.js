import { exit } from "node:process";
import db from "../config/db.js";
import { Rol, Usuario } from "../models/index.js";
import usuarios from "./usuarios.js";
import roles from "./roles.js";

const importarDatos = async () => {
	try {
		await db.authenticate();
		await db.sync();

		// Crea registros de roles
		await Rol.bulkCreate(roles);
		console.log("Datos de roles generados correctamente");

		// generar usuarios
		await Usuario.bulkCreate(await usuarios());

		exit(0);
	} catch (error) {
		console.log(error);
		exit(1);
	}
};

if (process.argv[2] === "-i") {
	importarDatos();
}