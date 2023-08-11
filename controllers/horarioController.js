import {Horario} from "../models/index.js";


const horarioController = {

    // Obtener todos los roles
    getAllHorarios: async (req, res) => {
        try {
            const horarios = await Horario.findAll();
            res.status(200).json(horarios);
        }catch (error) {
            res.status(500).json({ error: "Error al obtener los horarios" });
        }
    },

    // Crear un nuevo estudiante
    createHorario: async (req, res) => {
        try {
            const { cicloLectivo, provicional, turno } = req.body;

            const nuevoHorario = await Horario.create({
                cicloLectivo,
                provicional,
                turno
            });
                        
            res.status(201).json(nuevoHorario);

        } catch (error) {
            res.status(500).json({ error: "Error al crear el horario" });
            console.log(error)
        }
    },





};

export default horarioController;