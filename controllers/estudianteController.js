import {Estudiante} from "../models/index.js";


const estudianteController = {

    // Obtener todos los roles
    getAllEstudiantes: async (req, res) => {
        try {
            const estudiantes = await Estudiante.findAll();
            res.status(200).json(estudiantes);
        }catch (error) {
            res.status(500).json({ error: "Error al obtener los estudiantes" });
        }
    },

    // Crear un nuevo estudiante
    createEstudiante: async (req, res) => {
        try {
            const { id, nombre, apellido1, apellido2, fechaNacimiento, sexo } = req.body;

            console.log("Datos recibidos:", { id, nombre, apellido1, apellido2, fechaNacimiento, sexo });
            /* const nuevoEstudiante = await Estudiante.create({
                id,
                nombre,
                apellido1,
                apellido2,
                fechaNacimiento,
                sexo,
            });
            
            res.status(201).json(nuevoEstudiante); */




            const nuevoEstudiante = await Estudiante.create({
                id,
                nombre,
                apellido1,
                apellido2,
                fechaNacimiento,
                sexo,
            });
            
            console.log("Estudiante creado:", nuevoEstudiante);
            
            res.status(201).json(nuevoEstudiante);





        } catch (error) {
            res.status(500).json({ error: "Error al crear el estudiante" });
            console.log(error)
        }
    },

    // Obtener un rol por ID
    getRolById: async (req, res) => {
        const { id } = req.params;
        try {
            const rol = await Rol.findByPk(id);
        if (!rol) {
            res.status(404).json({ error: "Rol no encontrado" });
        } else {
            res.status(200).json(rol);
        }
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el rol" });
        }
    },

    // Actualizar un rol por ID
    updateRolById: async (req, res) => {
        const { id } = req.params;
        try {
            const rol = await Rol.findByPk(id);
        if (!rol) {
            res.status(404).json({ error: "Rol no encontrado" });
        } else {
            await rol.update(req.body);
            res.status(200).json(rol);
        }
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el rol" });
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