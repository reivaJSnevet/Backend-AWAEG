import cron from "node-cron";
import { Funcionario } from "../models/index.js";

cron.schedule("0 0 * * *", async () => {
	try {
		const funcionarios = await Funcionario.findAll();

		const hoy = new Date();
		const mesActual = hoy.getMonth();
		const diaActual = hoy.getDate();

		for (const funcionario of funcionarios) {
			const fechaNacimiento = new Date(funcionario.fechaNacimiento); // Convertir a Date
			const mesNacimiento = fechaNacimiento.getMonth();
			const diaNacimiento = fechaNacimiento.getDate() + 1;

			// Verifica si hoy es el cumpleaños del estudiante
			if (mesActual === mesNacimiento && diaActual === diaNacimiento) {
				const edad = funcionario.edad + 1;

				// Actualiza la edad en la base de datos
				await funcionario.update({ edad });
				console.log("Edad actualizada.");
			}
		}
		console.log("SE VERIFICARON LAS EDADES");
	} catch (error) {
		console.log(error);
	}
});
