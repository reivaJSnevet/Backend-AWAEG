import { Usuario, Rol } from "../models/index.js";

const usuarioController = {

    // Obtener todos los usuarios
    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            const usuariosRoles = []
            
            for (const usuario of usuarios) {
                const roles = await usuario.getRoles();
                usuariosRoles.push({
                    id: usuario.id,
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    contraseña: usuario.contraseña,
                    roles: roles
                });
            }

            res.status(200).json(usuariosRoles);
        } catch (error) {
      res.status(500).json({ error: "Error al obtener los usuarios" });
      console.log(error)
    }
  },

    // Crear un nuevo usuario
    createUsuario: async (req, res) => {
        try {
            const { nombre, correo, contraseña, idRol } = req.body;
           /*console.log("Datos recibidos:", { nombre, correo, contraseña, idRol }); */

            const nuevoUsuario = await Usuario.create({
                nombre,
                correo,
                contraseña,
            });

            if (idRol) {
                // Buscar el rol según el idRol proporcionado
                const rol = await Rol.findByPk(idRol);
    
                if (rol) {
                    // Agregar el rol al usuario
                    await nuevoUsuario.addRoles([rol]);
                }
            }
            res.status(201).json(nuevoUsuario);

        } catch (error) {
            res.status(500).json({ error: "Error al crear el usuario" });
            console.log(error);
        }
    },

  // Obtener un usuario por ID
    getUsuarioById: async (req, res) => {
        const { id } = req.params;

        try {

            const usuario = await Usuario.findByPk(id);
            
            if (!usuario) {
                res.status(404).json({ error: "Usuario no encontrado" });
            } else {
                const roles = await usuario.getRoles()
                const usuarioRoles = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    contraseña: usuario.contraseña,
                    roles: roles
                }
                res.status(200).json(usuarioRoles);
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
            const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            res.status(404).json({ error: "Usuario no encontrado" });
        } else {
            await usuario.update(req.body);
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
            const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            res.status(404).json({ error: "Usuario no encontrado" });
        } else {
            await usuario.destroy();
            res.status(200).json({ message: "Usuario eliminado correctamente" });
        }
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el usuario" });
        }
    },
};

export default usuarioController;
