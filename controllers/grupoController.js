import {Grupo} from "../models/index.js";


const grupoController = {

    // Obtener todos los roles
    getAllGrupos: async (req, res) => {
        try {
            const grupos = await Grupo.findAll();
            res.status(200).json(grupos);
        }catch (error) {
            res.status(500).json({ error: "Error al obtener los grupos" });
        }
    },

    // Crear un nuevo estudiante
    createGrupo: async (req, res) => {
        try {
            const { seccion, ciclo, grado, aula, cantAlumno } = req.body;

            const nuevoGrupo = await Grupo.create({
                seccion,
                ciclo,
                grado,
                aula,
                cantAlumno,
            });
                        
            res.status(201).json(nuevoGrupo);

        } catch (error) {
            res.status(500).json({ error: "Error al crear el grupo" });
            console.log(error)
        }
    },






};

export default grupoController;