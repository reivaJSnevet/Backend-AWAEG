import notaRepository from "../repositories/notaRepository.js";
import notaService from "../services/notaServices.js";

const notaController = {
    

    //Obtener todas las notas
    obtenerNotas: async (req, res) => {
        try{
            const notas = await notaService.obtenerTodasNotas();
            res.status(200).json(notas);
        }catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    //Crear Nota
    crearNota: async (req, res) => {
        try {
            const { calificacion, periodo, fechaSubida, funcionarioId } = req.body;
            const nuevaNota = await notaService.crearNota({
                calificacion,
                periodo,
                fechaSubida,
                funcionarioId,
            });
                        
            res.status(201).json(nuevaNota);

        } catch (error) {
            if (error.errors) {
                 const erroresValidacion = error.errors.map(err => err.message);
                 res.status(400).json({ errores: erroresValidacion});
            } else {
             res.status(500).json({ error: "Error al crear la nota"})
            };
         }
    },

    //Obtener nota por Id
    obtenerNotaPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const nota = await notaService.obtenerNotaPorId(id);
            res.status(200).json(nota);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    //Modificar Nota
    actualizarNota: async (req, res) => {
        try {
            const { id } = req.params;
            const { calificacion, periodo, fechaSubida, funcionarioId } = req.body;
            const datos = { calificacion, periodo, fechaSubida, funcionarioId }

            const nota = await notaRepository.actualizar(id, datos)
            return res.status(200).json(nota);
            } catch (error) {
                 console.error("Error al actualizar nota:", error);
            return res.status(500).json({ error: "Error interno del servidor." });
            }
    },

    
    //Eliminar Nota
    eliminarNota: async (req, res) => {
        const { id } = req.params;
        try {
            const nota = notaService.obtenerNotaPorId(id);
        if (!nota) {
            res.status(404).json({ error: "nota no encontrada" });
        } else {
            await notaService.borrarNota(id)
            res.status(200).json({ message: "nota eliminada correctamente" });
        }
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar la nota" });
        }
    }
}

export default notaController;