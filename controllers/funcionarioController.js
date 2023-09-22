import funcionarioService from "../services/funcionarioServices.js";

const funcionarioController = {
	//obtener all funcionarios
	getAllFuncionarios: async (req, res) => {
		try {
			const funcionarios =
				await funcionarioService.obtenerTodosFuncionarios();
			res.status(200).json(funcionarios);
		} catch (error) {
			res.status(500).json({
				error: "Error al obtener los funcionarios",
			});
			console.log(error);
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
			res.status(500).json(error);
			console.log(error);
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
			res.status(500).json({ error: "Error al obtener el funcionario" });
			console.log(error);
		}
	},

	// Actualizar un funcionario por ID
	updateFuncionarioById: async (req, res) => {
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

		try {
			const funcioario =
				await funcionarioService.obtenerFuncionarioPorId(id);
			if (!funcioario) {
				res.status(404).json({ error: "Funcionario no encontrado" });
			} else {
				// Actualizar el usuario con los nuevos datos
				await funcionarioService.actualizarFuncionario(id, datos);
				res.status(200).json({
					mensaje: "Funcionario actualizado correctamente",
				});
			}
		} catch (error) {
			res.status(500).json({
				error: "Error al actualizar el funcionario",
			});
		}
	},

	// Eliminar un rol por ID
	deleteFuncionarioById: async (req, res) => {
		const { id } = req.params;
		try {
			const funcioario =
				await funcionarioService.obtenerFuncionarioPorId(id);

			if (!funcioario) {
				res.status(404).json({ error: "Funcionario no encontrado" });
			} else {
				await funcionarioService.borrarFuncionario(id);
				res.status(200).json({
					message: "Funcionario eliminado correctamente",
				});
			}
		} catch (error) {
			res.status(500).json({ error: "Error al eliminar el funcionario" });
		}
	},
};

export default funcionarioController;
