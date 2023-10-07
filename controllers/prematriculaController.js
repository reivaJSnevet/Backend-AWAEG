import { Sequelize } from "sequelize";
import prematriculaServices from "../services/prematriculaServices.js";

const prematriculaController = {
    crearPrematricula: async (req, res) => {
        try {
            const {grado, estudianteId} = req.body;

            if (!grado || !estudianteId || isNaN(grado) || isNaN(estudianteId) ) {
                return res.status(400).json({ message: "Faltan datos obligatorios o formato incorrecto" });
            }

            const nuevaPrematricula = await prematriculaServices.crearPrematricula({grado, estudianteId});
            res.status(201).json(nuevaPrematricula);
        } catch (errors) {
            console.log(errors);
            res.status(500).json({error: errors});
        }
    },

    obtenerPrematriculas: async (req, res) => {
        try {
            const prematriculas = await prematriculaServices.obtenerPrematriculas();
            res.status(200).json(prematriculas);
        } catch (errors) {
            res.status(500).json({error: errors.message});
        }
    },

    obtenerPrematriculaPorId: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id || !Sequelize.Validator.isUUID(id, 4) ){
                return res.status(400).json({ message: "Faltan datos obligatorios o formato incorrecto" });
            }

            const prematricula = await prematriculaServices.obtenerPrematriculaPorId(id);
            res.status(200).json(prematricula);
        } catch (errors) {
            res.status(404).json({error: errors.message});
        }
    },

    actualizarPrematricula: async (req, res) => {
        try {
            const { id } = req.params;
            const {estado, grado, estudianteId} = req.body;

            if (!id || !Sequelize.Validator.isUUID(id, 4) || !estado || !grado || !estudianteId || typeof estado === "boolean" || isNaN(grado) || isNaN(estudianteId)) {
                return res.status(400).json({ message: "Faltan datos obligatorios o formato incorrecto" });
            }

            const prematricula = await prematriculaServices.actualizarPrematricula(id, {estado, grado, estudianteId});
            res.status(200).json({message: "Clase actualizada correctamente", prematricula});
        } catch (errors) {
            res.status(404).json({error: errors.message});
        }
    },

    borrarPrematricula: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id || !Sequelize.Validator.isUUID(id, 4)) {
                return res.status(400).json({ message: "Faltan datos obligatorios o formato incorrecto" });
            }

            await prematriculaServices.borrarPrematricula(id);
            res.status(200).json({message: "Prematricula borrada correctamente"});
        } catch (errors) {
            res.status(404).json({error: errors.message});
        }
    },
};

export default prematriculaController;
