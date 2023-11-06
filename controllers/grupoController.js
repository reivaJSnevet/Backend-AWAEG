import grupoService from "../services/grupoServices.js";

const grupoController = {
	// Obtener todos los grupos
	obtenerGrupos: async (req, res) => {
		try {
			const grupos = await grupoService.obtenerTodosGrupos();
			res.status(200).json(grupos);
		} catch (error) {
			console.error("Error al obtener los grupos:", error);
			res.status(500).json({
				error: "Error al obtener los grupos",
				detalle: error.message,
			});
		}
			
	},

	// Crear un nuevo grupo
    crearGrupo: async (req, res) => {
        try {
            const {
                seccion,
                ciclo,
                grado,
                aula,
                turno,
				horarioId,
				funcionarioId,
            } = req.body;
			
			if (!funcionarioId) {
                console.log(req.body);
				return res.status(400).json({ error: "Faltan datos obligatorios" });
			}

            const nuevoGrupo = await grupoService.crearGrupo({
                seccion,
                ciclo,
                grado,
                aula,
                turno,
				horarioId,
				funcionarioId,
            });
            res.status(201).json(nuevoGrupo);
        } catch (errors) {
            res.status(400).json({ error: errors });
        }
    },

	//encontrar grupo por seccion
	obtenerGrupo: async (req, res) => {
		const { seccion } = req.params;

		if (!seccion) {
			return res.status(400).json({ error: "El ID del grupo es obligatorio" });
		}

		try {
			const grupo = await grupoService.obtenerGrupoPorId(seccion);
			res.status(200).json(grupo);
		} catch (error){
			res.status(500).json({ error: error.message });
		}
		
	},

	//Actualizar un grupo

	actualizarGrupo: async (req, res) => {
		try {
			const { seccion } = req.params;
			const { ciclo, grado, aula, turno, horarioId, funcionarioId } = req.body;
			if (!seccion || !ciclo || !grado || !aula || !turno || !funcionarioId) {
				return res.status(400).json({ error: "Faltan datos obligatorios" });
			}
		await grupoService.actualizarGrupo(seccion, {
			ciclo,
			grado,
			aula,
			turno,
			horarioId,
			funcionarioId,
		});
		res.json({ message: "Grupo actualizado correctamente" });
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	},

	//eliminar Grupo

	eliminarGrupo: async (req, res) => {
		try {
			const { seccion } = req.params;

			if (!seccion) {
				return res.status(400).json({ error: "El ID del grupo es obligatorio" });
			}

			await grupoService.borrarGrupo(seccion);
			res.status(200).json({ message: "Grupo eliminado correctamente" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

    obtenerGruposConClasesPorFuncionario: async (req, res) => {
        try {
            const { funcionarioId } = req.params;
            if (!funcionarioId) {
                return res.status(400).json({ error: "El ID del funcionario es obligatorio" });
            }
            const grupos = await grupoService.obtenerGruposConClasesPorFuncionario(funcionarioId);
            res.status(200).json(grupos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default grupoController;
