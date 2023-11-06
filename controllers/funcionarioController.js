import funcionarioService from "../services/funcionarioServices.js";

const funcionarioController = {
	//obtener all funcionarios
	getAllFuncionarios: async (req, res) => {
		try {
			const funcionarios = await funcionarioService.obtenerTodosFuncionarios();
			res.status(200).json(funcionarios);
		} catch (error) {
			console.error("Error al obtener los funcionarios:", error);
			res.status(500).json({
				error: "Error al obtener los funcionarios",
				detalle: error.message,
			});
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
			} = req.body;

			const nuevoFuncionario = await funcionarioService.crearFuncionario({
				id,
				nombre,
				apellido1,
				apellido2,
				fechaNacimiento,
				sexo,
			});

			res.status(201).json(nuevoFuncionario);
		} catch (errors) {
			res.status(400).json({ error: errors.message });
		}
	},

	//Funcionario by id
	getFuncionarioById: async (req, res) => {
		const { id } = req.params;

		if (!id || isNaN(id)) {
			return res
				.status(400)
				.json({ error: "El ID del funcionario es obligatorio" });
		}

		try {
			const funcionario = await funcionarioService.obtenerFuncionarioPorId(id);
			res.status(200).json(funcionario);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Actualizar un funcionario por ID
	updateFuncionarioById: async (req, res) => {
		try {
			const { id } = req.params;
			const { nombre, apellido1, apellido2, fechaNacimiento, sexo, usuarioId } = req.body;

		await funcionarioService.actualizarFuncionario(id, {
			nombre,
			apellido1,
			apellido2,
			fechaNacimiento,
			sexo,
			usuarioId,
		});
		res.status(200).json({ message: "Funcionario actualizado correctamente" });
		} catch {
			res.status(500).json({ error: error.message });
		}
	},

	// Eliminar un rol por ID
	deleteFuncionarioById: async (req, res) => {
		try {
			const { id } = req.params;

			if (!id || isNaN(id)) {
				return res
					.status(400)
					.json({ error: "Faltan datos obligatorios [id]" });
			}

			await funcionarioService.borrarFuncionario(id);
			res.status(200).json({ message: "Funcionario eliminado correctamente" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}	
	}
};

export default funcionarioController;
