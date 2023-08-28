import encargadoService from "../services/encargadoServices.js";

const encargadoController = {

    //Obtener todo los encargados
    obtenerEncargados: async (req, res) => {
        try{
            const encargados = await encargadoService.obtenerTodosEncargados();
            res.status(200).json(encargados);
        }catch (error) {
            res.status(500).json({ error: "Error al obtener los encargados" });
        }
    },

    //Crear un Encargado
    crearEncargado: async (req, res) => {
        try {
            const { id, nombre, apellido1, apellido2} = req.body;

            const nuevoEncargado = await encargadoService.crearEncargado({
                id,
                nombre,
                apellido1,
                apellido2
            });
                        
            res.status(201).json(nuevoEncargado);

        } catch (error) {
            res.status(500).json({ error: "Error al crear el encargado" });
            console.log(error)
        }
    },

    //Encontrar encargado por id
    obtenerEncargado: async (req, res) => {
        const { id } = req.params;
        
        try {
            const encargado = await encargadoService.obtenerEncargadoPorId(id);

            
        if (!encargado) {
            res.status(404).json({ error: "Encargado no encontrado" });
        } else {
                res.status(200).json(encargado);
        }
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el encargado" });
        }
    },

    //Actualiazar un encargado
    actualizarEncargado: async (req, res) => {
        try{
            const { id } = req.params;
            const { nombre, apellido1, apellido2} = req.body;
    
            await encargadoService.actualizarEncargado(id, {nombre, apellido1, apellido2});
            res.json({message: "Encargado actualizado con exito!"});
    
          }catch (error) {
                res.status(500).json({error: "Error al actualizar el encargado"});
          }
    },

    //Eliminar un encargado
    eliminarEncargado: async (req, res) => {
        try{
            const { id } = req.params;
            await encargadoService.borrarEncargado(id);
            res.json({ message: 'Encargado borrado correctamente' });

       } catch (error) {
            res.status(500).json({ error: "Error al borrar el encargado" });
        }
    }

}

export default encargadoController;