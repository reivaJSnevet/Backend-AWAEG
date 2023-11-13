import usuarioService from "../services/usuarioService.js";

const usuarioController = {
	// Crear un nuevo usuario
    createUsuario: async (req, res) => {
        try {
            const { nombre, correo, contraseña, roleId , id} = req.body;

            console.log(req.body);

            if (!nombre || !correo || !contraseña || !roleId) {
                return res.status(400).json({ error: "Faltan datos" });
            }

            const nuevoUsuario = await usuarioService.crearUsuario({ nombre, correo, contraseña, roleId }, id);
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

	// Obtener todos los usuarios
	getAllUsuarios: async (req, res) => {
		try {
			const usuarios = await usuarioService.obtenerTodosUsuario();
			res.status(200).json(usuarios);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Obtener un usuario por ID
	getUsuarioById: async (req, res) => {
        try {
            const { id } = req.params;
            if(isNaN(id)){
                return res.status(400).json({ error: "Faltan datos o formato incorrecto" });
            }
            const usuario = await usuarioService.obtenerUsuarioPorId(id);
            res.status(200).json(usuario);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
	},

	// Actualizar un usuario por ID
	updateUsuarioById: async (req, res) => {
        try {
            const {id} = req.params;
            const { nombre, correo, contraseña, roleId } = req.body;

            if (!id || !nombre || !correo || !contraseña || isNaN(roleId)) {
                return res.status(400).json({ error: "Faltan datos" });
            }

            const usuario = await usuarioService.actualizarUsuario(id, { nombre, correo, contraseña, roleId });
            res.status(200).json(usuario);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
	},

	// Eliminar un usuario por ID
	deleteUsuarioById: async (req, res) => {
        try {
            const {id} = req.params;
            if(isNaN(id)){
                return res.status(400).json({ error: "Faltan datos o formato incorrecto" });
            }
            const usuario = await usuarioService.borrarUsuario(id);
            res.status(200).json(usuario);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
	},
};

export default usuarioController;
