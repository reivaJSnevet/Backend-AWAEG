import {Rol} from "../models/index.js";


const rolController = {

  // Obtener todos los roles
  getAllRoles: async (req, res) => {
    try {
      const roles = await Rol.findAll();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los roles" });
    }
  },

  // Crear un nuevo rol
  createRol: async (req, res) => {
    try {
      const { nombre, nivelPrivilegio, descripcion } = req.body;
      //console.log("Datos recibidos:", { nombre, correo, contraseña });

      const nuevoRol = await Rol.create({
        nombre,
        nivelPrivilegio,
        descripcion,
      });
      res.status(201).json(nuevoRol);

    } catch (error) {
      res.status(500).json({ error: "Error al crear el rol" });
      console.log(error)

    }
  },

  // Obtener un rol por ID
  getRolById: async (req, res) => {
    const { id } = req.params;
    try {
      const rol = await Rol.findByPk(id);
      if (!rol) {
        res.status(404).json({ error: "Rol no encontrado" });
      } else {
        res.status(200).json(rol);
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el rol" });
    }
  },

  // Actualizar un rol por ID
  updateRolById: async (req, res) => {
    const { id } = req.params;
    try {
      const rol = await Rol.findByPk(id);
      if (!rol) {
        res.status(404).json({ error: "Rol no encontrado" });
      } else {
        await rol.update(req.body);
        res.status(200).json(rol);
      }
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el rol" });
    }
  },

  // Eliminar un rol por ID
  deleteRolById: async (req, res) => {
    const { id } = req.params;
    try {
      const rol = await Rol.findByPk(id);
      if (!rol) {
        res.status(404).json({ error: "Rol no encontrado" });
      } else {
        await rol.destroy();
        res.status(200).json({ message: "Rol eliminado correctamente" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el Rol" });
    }
  },



};

export default rolController;
