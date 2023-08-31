import { Prematricula } from "../models/index.js";

const prematriculaController = {

    //Ubtener todas las prematriculas
    getAllPrematriculas: async (req, res) => {
        try{
            const prematriculas = await Prematricula.findAll();
            res.status(200).json(prematriculas);
        }catch (error) {
            res.status(500).json({ error: "Error al obtener las prematriculas" });
        }
    },

    //Crear una prematricula
    createPrematricula: async (req, res) => {
        try{
            const { id, estado, grado, } = req.body;

            const nuevaPrematricula = await Prematricula.create({
                id, estado, grado
            });
        
            res.status(201).json(nuevaPrematricula);

        }catch (error) {
            res.status(500).json({ error: "Error al crear la prematricula" });
            console.log(error)
        }
    },

    //Eliminar prematricula
    // deletePrematriculaById: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const prematricula = await Prematricula.findByPk(id);
    //     if (!prematricula) {
    //         res.status(404).json({ error: "Prematricula no encontrado" });
    //     } else {
    //         await prematricula.destroy();
    //         res.status(200).json({ message: "Prematricula eliminada correctamente" });
    //     }
    //     } catch (error) {
    //         res.status(500).json({ error: "Error al eliminar el prematricula" });
    //     }
    // },
};


export default prematriculaController;