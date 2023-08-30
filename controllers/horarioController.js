import horarioServices from "../services/horarioServices.js";


const horarioController = {

    // Obtener todos los horarios
    obtenerHorarios: async (req, res) => {
        try{
            const horarios = await horarioServices.obtenerTodosHorarios();
            res.status(200).json(horarios);
        }catch (error) {
            res.status(500).json({ error: "Error al obtener los Horarios" });
        }
    },

    // Crear un nuevo grupo
    crearHorario: async (req, res) => {
        try {
            const {provisional, habilitado} = req.body;
            const datos = {provisional, habilitado}

            const nuevoHorario = await horarioServices.crearHorario(datos);
                        
            res.status(201).json(nuevoHorario);

        } catch (error) {
            res.status(500).json({ error: "Error al crear el horario" });
            console.log(error)
        }
    },


    //encontrar horario por id
    obtenerHorario: async(req, res) => {
        const { idHorario } = req.params;
        
        try {
            const horario = await horarioServices.obtenerHorarioPorId(idHorario);

            
        if (!horario) {
            res.status(404).json({ error: "Horario no encontrado" });
        } else {
                res.status(200).json(horario);
        }
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el horario" });
        }
    },

    //Actualizar un horario

    actualizarHorario: async(req, res) => {
        try{
            const { idHorario } = req.params;
            const { provisional, habilitado} = req.body;
    
            await horarioServices.actualizarHorario(idHorario, {provisional, habilitado});
            res.json({message: "Horario actualizado con exito!"});
    
          }catch (error) {
                res.status(500).json({error: "Error al actualizar el horario"});
          }
    },

    //eliminar Horario

    eliminarHorario: async (req, res) => {
        try{
            const { idHorario } = req.params;
            await horarioServices.borrarHorario(idHorario);
            res.json({ message: 'Horario borrado correctamente' });

       } catch (error) {
            res.status(500).json({ error: "Error al borrar el horario " });
        }
    }
};

export default horarioController;