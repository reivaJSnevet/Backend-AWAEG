import funcionarioRepository from "../repositories/funcionarioRepository.js";

const funcionarioService = {
	crearFuncionario: async (funcionario) => {
		return await funcionarioRepository.crear(funcionario);
	},

	obtenerTodosFuncionarios: async () => {
		return await funcionarioRepository.obtenerTodos();
	},

	obtenerFuncionarioPorId: async (id) => {
		return await funcionarioRepository.obtenerPorId(id);
	},

	actualizarFuncionario: async (id, nuevosDatos) => {
		return await funcionarioRepository.actualizar(id, nuevosDatos);
	},

	borrarFuncionario: async (id) => {
		return await funcionarioRepository.borrar(id);
	},
};

export default funcionarioService;
