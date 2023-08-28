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
            const { seccion, ciclo, grado, aula, cantAlumno, turno} = req.body;

            const nuevoGrupo = await grupoServices.crearGrupo({
                seccion,
                ciclo,
                grado,
                aula,
                cantAlumno,
                turno
            });
                        
            res.status(201).json(nuevoGrupo);

        } catch (error) {
            res.status(500).json({ error: "Error al crear el grupo" });
            console.log(error)
        }
    },


    //encontrar grupo por seccion
    obtenerGrupo: async(req, res) => {
        const { seccion } = req.params;
        
        try {
            const grupo = await grupoServices.obtenerGrupoPorId(seccion);

            
        if (!grupo) {
            res.status(404).json({ error: "Grupo no encontrado" });
        } else {
                res.status(200).json(grupo);
        }
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el grupo" });
        }
    },

    //Actualizar un grupo

    actualizarGrupo: async(req, res) => {
        try{
            const { seccion } = req.params;
            const { ciclo, grado, aula, cantAlumno, turno} = req.body;
    
            await grupoServices.actualizarGrupo(seccion, {ciclo, grado, aula, cantAlumno, turno});
            res.json({message: "Grupo actualizado con exito!"});
    
          }catch (error) {
                res.status(500).json({error: "Error al actualizar el grupo"});
          }
    },

    //eliminar Grupo

    eliminarGrupo: async (req, res) => {
        try{
            const { seccion } = req.params;
            await grupoServices.borrarGrupo(seccion);
            res.json({ message: 'Seccion borrada correctamente' });

       } catch (error) {
            res.status(500).json({ error: "Error al borrar el grupo " });
        }
    }
};

export default grupoController;