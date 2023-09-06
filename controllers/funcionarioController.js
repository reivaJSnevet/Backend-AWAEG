import funcionarioService from "../services/funcionarioServices.js";

const funcionarioController = {
	//obtener all funcionarios
	getAllFuncionarios: async (req, res) => {
		try {
			const funcionarios =
				await funcionarioService.obtenerTodosFuncionarios();
			res.status(200).json(funcionarios);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Crear un nuevo funcionario
	createFuncionario: async (req, res) => {
		try {
			const {
				id,
				nombre,
				apellido1,
				apellido2,
				fechaNacimiento,
				sexo,
				usuarioId,
			} = req.body;

			const nuevoFuncionario = await funcionarioService.crearFuncionario({
				id,
				nombre,
				apellido1,
				apellido2,
				fechaNacimiento,
				sexo,
				usuarioId,
			});

			res.status(201).json(nuevoFuncionario);
		} catch (error) {
			if (error.errors) {
				const erroresValidacion = error.errors.map(
					(err) => err.message,
				);
				res.status(400).json({ errores: erroresValidacion });
			} else {
				res.status(500).json({
					error: "Error al crear el funcionario",
				});
			}
		}
	},

	//Funcionario by id
	getFuncionarioById: async (req, res) => {
		try {
			const { id } = req.params;
			const funcionario =
				await funcionarioService.obtenerFuncionarioPorId(id);
			res.status(200).json(funcionario);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Actualizar un funcionario por ID
	updateFuncionarioById: async (req, res) => {
		try {
			const { id } = req.params;
			const {
				nombre,
				apellido1,
				apellido2,
				fechaNacimiento,
				sexo,
				usuarioId,
			} = req.body;
			const datos = {
				nombre,
				apellido1,
				apellido2,
				fechaNacimiento,
				sexo,
				usuarioId,
			};

			const funcionario = await funcionarioService.actualizarFuncionario(
				id,
				datos,
			);
			return res.status(200).json(funcionario);
		} catch (error) {
			console.error("Error al actualizar el funcionario:", error);
			return resw
				.status(500)
				.json({ error: "Error interno del servidor." });
		}
	},

	// Eliminar un rol por ID
	deleteFuncionarioById: async (req, res) => {
		const { id } = req.params;
		try {
			const funcionario = funcionarioService.obtenerFuncionarioPorId(id);
			if (!funcionario) {
				res.status(404).json({ error: "funcionario no encontrado" });
			} else {
				await funcionarioService.borrarFuncionario(id);
				res.status(200).json({
					message: "Funcionario eliminado con exito",
				});
			}
		} catch (error) {
			res.status(500).json({ error: "Error al eliminar el funcionario" });
		}
	},
};

export default funcionarioController;
