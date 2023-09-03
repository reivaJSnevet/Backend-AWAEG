import grupoServices from "../services/grupoServices.js";



const grupoController = {

    // Obtener todos los grupos
    obtenerGrupos: async (req, res) => {
        try{
            const grupos = await grupoServices.obtenerTodosGrupos();
            res.status(200).json(grupos);
        }catch (error) {
            res.status(500).json({ error: "Error al obtener los grupos" });
        }
    },

    // Crear un nuevo grupo
    crearGrupo: async (req, res) => {
        try {
            const { seccion, ciclo, grado, aula, cantAlumno, turno, horarioId,profesorGuia} = req.body;
            const nuevoGrupo = await grupoServices.crearGrupo({
                seccion,
                ciclo,
                grado,
                aula,
                cantAlumno,
                turno,
                horarioId,
                profesorGuia
            });
                        
            res.status(201).json(nuevoGrupo);

        } catch (error) {
            if (error.errors) {
                 const erroresValidacion = error.errors.map(err => err.message);
                 res.status(400).json({ errores: erroresValidacion});
            } else {
             res.status(500).json({ error: "Error al crear el funcionario"})
            };
         }
    },


    //encontrar grupo por seccion
    obtenerGrupo: async(req, res) => {
        try {
            const { seccion } = req.params;
            const grupo = await grupoServices.actualizarGrupo(seccion);
            res.status(200).json(grupo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //Actualizar un grupo

    actualizarGrupo: async(req, res) => {
        try{
            const { seccion } = req.params;
            const { ciclo, grado, aula, cantAlumno, turno} = req.body;
            const datos = { ciclo, grado, aula, cantAlumno, turno }

            const grupo = await grupoServices.actualizarGrupo(seccion, datos)
            return res.status(200).json(grupo);
            } catch (error) {
                 console.error("Error al actualizar el grupo:", error);
            return res.status(500).json({ error: "Error interno del servidor." });
            }
    },

    //eliminar Grupo

    eliminarGrupo: async (req, res) => {
            const { seccion } = req.params;
            try {
                const grupo = grupoServices.obtenerGrupoPorId(seccion);
            if (!grupo) {
                res.status(404).json({ error: "Grupo no encontrado" });
            } else {
                await grupoService.borrarGrupo(seccion)
                res.status(200).json({ message: "Grupo eliminado correctamente" });
            }
            } catch (error) {
                res.status(500).json({ error: "Error al eliminar el grupo" });
            }
    }
};

export default grupoController;