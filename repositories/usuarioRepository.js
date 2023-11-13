import { Rol, Usuario, Estudiante, Funcionario } from "../models/index.js";

const usuarioRepository = {
	crear: async (usuario, id) => {
        const duplicado = await Usuario.findOne({
            where: {
                nombre: usuario.nombre,
            }
        });

        if (duplicado) {
            return new Error("El usuario ya existe");
        }

		const nuevoUsuario = await Usuario.create(usuario);

        if(id){
            const funcionario = await Funcionario.findByPk(id);

            if(funcionario){
                funcionario.usuarioId = nuevoUsuario.id;
                funcionario.save();
            }else{
                const estudiante = await Estudiante.findByPk(id);
                estudiante.usuarioId = nuevoUsuario.id;
                estudiante.save();
            }
        }

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
