import funcionarioRepository from "../repositories/funcionarioRepository.js";

const funcionarioService = {
	crearFuncionario: async (funcionario) => {
		try {
			const nuevoFuncionario = await funcionarioRepository.crear(funcionario);
			return nuevoFuncionario;
		} catch (error) {
			const errors = [];
			if (error.name === "SequelizeValidationError") {
				error.errors.forEach((e) => {
					errors.push({
						Type: "Validation Error",
						field: e.path,
						message: e.message,
					});
				});
			} else {
				errors.push({ field: "general", message: error.message });
			}
			throw errors;
		}
	},

	obtenerTodosFuncionarios: async () => {
		try {
			const funcionario = await funcionarioRepository.obtenerTodos();
			return funcionario;
		} catch (errors) {
			errors.push({ field: "general", message: error.message });
			throw errors;
		}
	},

	obtenerFuncionarioPorId: async (id) => {
		try {
			const funcionario = await funcionarioRepository.obtenerPorId(id);
			if (!funcionario) {
				throw new Error("Funcionario no encontrado");
			}
			return funcionario;
		} catch (error) {
			throw error
		}
	},

	actualizarFuncionario: async (id, nuevosDatos) => {
		try {
			const funcionario = await funcionarioRepository.actualizar(id, nuevosDatos);
			if (!funcionario) {
				throw new Error("Funcionario no encontrado");
			}
			return funcionario;
		} catch (error) {
			throw error
		}	
	},

	borrarFuncionario: async (id) => {
		try {
			const funcionario = await funcionarioRepository.borrar(id);
			if (!funcionario) {
				throw new Error("Funcionario no encontrado");
			}
			return funcionario;
		} catch (error) {
			throw error
		}
	},
};

export default funcionarioService;
