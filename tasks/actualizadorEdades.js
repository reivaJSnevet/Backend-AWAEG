import cron from "node-cron";
import { Estudiante } from "../models/index.js";

cron.schedule('0 0 * * *', async () => {
    try {
        const estudiantes = await Estudiante.findAll();

        const hoy = new Date();
        const mesActual = hoy.getMonth();
        const diaActual = hoy.getDate();

        for (const estudiante of estudiantes) {
            const fechaNacimiento = new Date(estudiante.fechaNacimiento); // Convertir a Date
            const mesNacimiento = fechaNacimiento.getMonth();
            const diaNacimiento = fechaNacimiento.getDate() + 1;

            // Verifica si hoy es el cumpleaños del estudiante
            if (mesActual === mesNacimiento && diaActual === diaNacimiento) {
                const edad = estudiante.edad + 1;

                // Actualiza la edad en la base de datos
                await estudiante.update({ edad });
                console.log('Edad actualizada.');
            }
        }
        console.log("SE VERIFICARON LAS EDADES")
    } catch (error) {
        console.log(error);
    }
});


