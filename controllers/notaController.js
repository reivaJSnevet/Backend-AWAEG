import notaService from "../services/notaServices.js";

const notaController = {
    

    //Obtener todas las notas
    obtenerNotas: async (req, res) => {
        try{
            const notas = await notaService.obtenerTodasNotas();
            res.status(200).json(notas);
        }catch (error) {
            res.status(500).json({ error: "Error al obtener las notas" });
        }
    },


    //Crear Nota
    crearNota: async (req, res) => {
        try {
            const { calificacion, periodo, fechaSubida, funcionarioId} = req.body;
            const datos = {calificacion, periodo, fechaSubida, funcionarioId};

            const nuevaNota = await notaService.crearNota(datos);
                        
            res.status(201).json(nuevaNota);

        } catch (error) {
            res.status(500).json({ error: "Error al crear la nota" });
            console.log(error)
        }
    },

    //Obtener nota por Id
    obtenerNotaPorId: async (req, res) => {
        const { id } = req.params;
        
        try {
            const nota = await notaService.obtenerNotaPorId(id);

            
        if (!nota) {
            res.status(404).json({ error: "Nota no encontrada" });
        } else {
                res.status(200).json(nota);
        }
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la nota" });
        }
    },


    //Modificar Nota
    actualizarNota: async (req, res) => {
        try{
            const { id } = req.params;
            const { calificacion, periodo, fechaSubida} = req.body;
    
            await notaService.actualizarNota(id, {calificacion, periodo, fechaSubida});
            res.json({message: "Nota actualizada con exito!"});
    
          }catch (error) {
                res.status(500).json({error: "Error al actualizar la nota"});
          }
    },

    
    //Eliminar Nota
    eliminarNota: async (req, res) => {
        try{
            const { id } = req.params;
            await notaService.borrarNota(id);
            res.json({ message: 'Nota borrada correctamente' });

       } catch (error) {
            res.status(500).json({ error: "Error al borrar la nota" });
        }
    }
}

export default notaController;