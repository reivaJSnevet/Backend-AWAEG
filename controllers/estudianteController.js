import estudianteRepository from "../repositories/estudianteRepository.js";

const estudianteController = {
    
    getAllEstudiantes: async (req, res) => {
        try {
        const estudiantes = await estudianteRepository.getAll();
            res.status(200).json(estudiantes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createEstudiante: async (req, res) => {
        try {
            const { id, nombre, apellido1, apellido2, fechaNacimiento, sexo, direccion } = req.body;
            const nuevoEstudiante = await estudianteRepository.create({
                id,
                nombre,
                apellido1,
                apellido2,
                fechaNacimiento,
                sexo,
                direccion,
            });
            res.status(201).json(nuevoEstudiante);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getEstudianteById: async (req, res) => {
        try {
            const { id } = req.params;
            const estudiante = await estudianteRepository.getById(id);
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
    deleteRolById: async (req, res) => {
        const { id } = req.params;
        try {
            const rol = await Rol.findByPk(id);
        if (!rol) {
            res.status(404).json({ error: "Rol no encontrado" });
        } else {
            await rol.destroy();
            res.status(200).json({ message: "Rol eliminado correctamente" });
        }
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el Rol" });
        }
    },



};

export default estudianteController;