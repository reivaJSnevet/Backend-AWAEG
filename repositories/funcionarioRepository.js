import { Funcionario, Usuario, Rol } from "../models/index.js";

const funcionarioRepository = {
	crear: async (funcionario) => {
		const nuevoFuncionario = await Funcionario.create(funcionario);
		return nuevoFuncionario;
	},

	obtenerTodos: async () => {
		const funcionarios = await Funcionario.findAll({
			include: [
				{
					model: Usuario,
					attributes: ["nombre", "correo"],
					include: [{
						model: Rol,
						attributes: ["nombre"]
					}]
				}
			],
		});
	return funcionarios;
	},

	obtenerPorId: async (id) => {
		const funcionario = await Funcionario.findByPk(id, {
			include: [
				{
					model: Usuario,
					attributes: ["nombre", "correo"],
					include: [{
						model: Rol,
						attributes: ["nombre"]
					}]
				},

			]
		});
		return funcionario;
	},

	actualizar: async (id, nuevosDatos) => {
		const funcionario = await Funcionario.findByPk(id);
		if (!funcionario) {
			return funcionario;
		}
		await funcionario.update(nuevosDatos);
		return funcionario;
	},

	borrar: async (id) => {
		const funcionario = await Funcionario.findByPk(id);
		if (!funcionario) {
			return funcionario;
		}
		return await funcionario.destroy();
	},
};

export default funcionarioRepository;
