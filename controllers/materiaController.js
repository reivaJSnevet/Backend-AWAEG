import e from "express";
import materiaService from "../services/materiaService.js";

const materiaController = {

	crearMateria: async (req, res) => {
		try {
			const { nombre } = req.body;

            if(!nombre){
                return res.status(400).json({error: "El nombre de la materia es requerido"});
            }

			const nuevaMateria = await materiaService.crearMateria({
                nombre
			});

			res.status(201).json(nuevaMateria);
		} catch (error) {
				const errores = error.map(
					(err) => err.message,
				);
				res.status(400).json({ errores: errores });
		}
	},

	obtenerMaterias: async (req, res) => {
        try {
            const materias = await materiaService.obtenerTodasMateria();
            res.status(200).json(materias);
        } catch (error) {
            res.status(500).json({
                error: "Error al obtener las materias.",
                detalle: error.message
            });
        }
	},

	obtenerMateriaPorId: async (req, res) => {
        try {
            const { id } = req.params;

            if(!id || isNaN(id)){
                return res.status(400).json({error: "Faltan datos obligatorios [id], o formato incorrecto"});
            }
            
            const materia = await materiaService.obtenerMateriaPorId(id);
            res.status(200).json(materia);

        } catch (error) {
            res.status(404).json({ error: error.message});
        }
	},

	//Modificar Nota
	actualizarMateria: async (req, res) => {
		try {
			const { id } = req.params;
			const { nombre } = req.body;

            if(!id || isNaN(id) || !nombre){
                return res.status(400).json({error: "Faltan datos obligatorios [id], o formato incorrecto"});
            }

			await materiaService.actualizarMateria(id, {nombre});
			return res.status(200).json(" Materia actualizada correctamente");

		} catch (error) {
			return res
				.status(404)
				.json({ error: error.message});
		}
	},

	//Eliminar Nota
	eliminarMateria: async (req, res) => {
		try {
            const { id } = req.params;

            if(!id || isNaN(id)){
                return res.status(400).json({error: "Faltan datos obligatorios [id], o formato incorrecto"});
            }

            await materiaService.borrarMateria(id);
            return res.status(200).json("Materia eliminada correctamente");

		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	},
};

export default materiaController;
