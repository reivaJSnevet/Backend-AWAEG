import estudianteService from "../services/estudianteService.js";

const estudianteController = {
    
    createEstudiante: async (req, res) => {
        try {
            const { id, nombre, apellido1, apellido2, fechaNacimiento, sexo, direccion, usuarioId } = req.body;
            
            const nuevoEstudiante = await estudianteService.crearEstudiante({
                id,
                nombre,
                apellido1,
                apellido2,
                fechaNacimiento,
                sexo,
                direccion,
                usuarioId
            });
            res.status(201).json(nuevoEstudiante);
        } catch (error) {
            if (error.errors) {
                const erroresValidacion = error.errors.map(err => err.message);
                res.status(400).json({ errores: erroresValidacion });
              } else {
                res.status(500).json({ error: "Error al crear el rol" });
              };
        }
    },
    
    getAllEstudiantes: async (req, res) => {
        try {
        const estudiantes = await estudianteService.obtenerTodosEstudiante();
            res.status(200).json(estudiantes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    
    getEstudianteById: async (req, res) => {
        try {
            const { id } = req.params;
            const estudiante = await estudianteService.obtenerEstudiantelPorId(id);
            res.status(200).json(estudiante);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

 
    updateEstudianteById: async (req, res) => {         
        try {
            const { id } = req.params;
            const { nombre, apellido1, apellido2, fechaNacimiento, sexo } = req.body;
            const datos = { nombre, apellido1, apellido2, fechaNacimiento, sexo }

            const estudiante = await estudianteRepository.updateById(id, datos)
            return estudiante
            } catch (error) {
                 console.error("Error al actualizar estudiante:", error);
            return res.status(500).json({ error: "Error interno del servidor." });
            }
    },

    // Eliminar un rol por ID
    deleteEstudianteById: async (req, res) => {
        const { id } = req.params;
        try {
            const estudiante = estudianteService.obtenerEstudiantelPorId(id);
        if (!estudiante) {
            res.status(404).json({ error: "estudiante no encontrado" });
        } else {
            await estudianteService.borrarEstudiante(id)
            res.status(200).json({ message: "estudiante eliminado correctamente" });
        }
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el estudiante" });
        }
    },

};

export default estudianteController;