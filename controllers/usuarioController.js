import {Usuario} from "../models/index.js";

const usuarioController = {
  
  // Obtener todos los usuarios
  getAllUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  },

  // Crear un nuevo usuario
  createUsuario: async (req, res) => {
    try {
      const { nombre, correo, contraseña } = req.body;
      console.log("Datos recibidos:", { nombre, correo, contraseña });

      const nuevoUsuario = await Usuario.create({
        nombre,
        correo,
        contraseña,
      });
      res.status(201).json(nuevoUsuario);

    } catch (error) {
      res.status(500).json({ error: "Error al crear el usuario" });
      console.log(error)

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
        res.status(200).json(usuario);
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el usuario" });
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
