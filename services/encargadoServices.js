import encargadoRepository from "../repositories/encargadoRepository.js";

const encargadoService = {
	crearEncargado: async (encargado) => {
		try {
			const nuevoEncargado = await encargadoRepository.crear(encargado);
			return nuevoEncargado;
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

	obtenerTodosEncargados: async () => {
		try {
			const encargados = await encargadoRepository.obtenerTodos();
			return encargados;
		} catch (errors) {
			errors.push({ field: "general", message: error.message });
			throw errors;
		}
	},

	obtenerEncargadoPorId: async (id) => {
		try {
			const encargado = await encargadoRepository.obtenerPorId(id);
			if (!encargado) {
				throw new Error("Encargado no encontrado");
			}
			return encargado;
		} catch (error) {
			throw error;
		}
	},

	actualizarEncargado: async (id, nuevosDatos) => {
		try {
			const encargado = await encargadoRepository.actualizar(
				id,
				nuevosDatos,
			);
			if (!encargado) {
				throw new Error("Encargado no encontrado");
			}
			return encargado;
		} catch (error) {
			throw error;
		}
	},

	borrarEncargado: async (id) => {
		try {
			const encargado = await encargadoRepository.borrar(id);
			if (!encargado) {
				throw new Error("Encargado no encontrado");
			}
			return encargado;
		} catch (error) {
			throw error;
		}
	},
};

export default encargadoService;
