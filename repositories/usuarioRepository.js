import { Rol, Usuario } from "../models/index.js";

const usuarioRepository = {
	crear: async (usuario) => {
		const nuevoUsuario = await Usuario.create(usuario);
		return nuevoUsuario;
	},

	obtenerTodos: async () => {
		const usuarios = await Usuario.findAll({
			include: [
				{
					model: Rol
				},
			],
		});
		return usuarios;
	},

	obtenerPorId: async (id) => {
        const usuario = await Usuario.findByPk(id, {
            include: [
                {
                    model: Rol
                },
            ],
        });
        return usuario;
	},

	actualizar: async (id, nuevosDatos) => {
		const usuario = await Usuario.findByPk(id);
        if (!usuario) {
           return usuario;
        }
        await usuario.update(nuevosDatos);
        return usuario;
	},

	borrar: async (id) => {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return usuario;
        }
        await usuario.destroy();
        return usuario;
	},
};

export default usuarioRepository;
