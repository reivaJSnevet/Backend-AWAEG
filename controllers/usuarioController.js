import usuarioService from "../services/usuarioService.js";

const usuarioController = {
    
    // Crear un nuevo usuario
    createUsuario: async (req, res) => {
        try {
            const { nombre, correo, contraseña, roleId } = req.body;
            const datos = { nombre, correo, contraseña, roleId }

            const nuevoUsuario = await usuarioService.crearUsuario(datos)
            res.status(201).json(nuevoUsuario);

        } catch (error) {
            res.status(500).json({ error: "Error al crear el usuario" });
            console.log(error);
        }
    },

    // Obtener todos los usuarios
    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await usuarioService.obtenerTodosUsuario()
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los usuarios" });
            console.log(error)
        }
  },

  // Obtener un usuario por ID
    getUsuarioById: async (req, res) => {
        const { id } = req.params;

        try {
            const usuario = await usuarioService.obtenerUsuarioPorId(id)
            
            if (!usuario) {
                res.status(404).json({ error: "Usuario no encontrado" });
            } else {
                res.status(200).json(usuario);
            }

        } catch (error) {
            res.status(500).json({ error: "Error al obtener el usuario" });
            console.log(error)
        }
    },

    // Actualizar un usuario por ID
    updateUsuarioById: async (req, res) => {
        const { id } = req.params;
        try {
            const usuario = await usuarioService.obtenerUsuarioPorId(id);
        if (!usuario) {
            res.status(404).json({ error: "Usuario no encontrado" });
        } else {
            await usuarioService.actualizarUsuario(id)
            res.status(200).json(usuario);
        }
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el usuario" });
        }
    },

    // Eliminar un usuario por ID
    deleteUsuarioById: async (req, res) => {
        const { id } = req.params;
        try {
            const usuario = await usuarioService.obtenerUsuarioPorId(id);

            if (!usuario) {
                res.status(404).json({ error: "Usuario no encontrado" });
            } else {
                await usuarioService.borrarUsuario(id);
                res.status(200).json({ message: "Usuario eliminado correctamente" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el usuario" });
        }
    },
};

export default usuarioController;
