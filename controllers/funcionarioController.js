import funcionarioService from "../services/funcionarioServices.js";


const funcionarioController = {

    
    //obtener all funcionarios
    getAllFuncionarios: async (req, res) => {
        try {
            const funcionarios = await funcionarioService.obtenerTodosFuncionarios();
            res.status(200).json(funcionarios);
        }catch (error) {
            res.status(500).json({ error: "Error al obtener los funcionarios" });
        }
    },

    //Crear un nuevo funcionario
    createFuncionario: async (req, res) => {
        try {
            const { id, nombre, apellido1, apellido2, fechaNacimiento, sexo, usuarioId } = req.body;
            const datos = {id, nombre, apellido1, apellido2, fechaNacimiento, sexo, usuarioId};

            const nuevoFuncionario = await funcionarioService.crearFuncionario(datos);
                        
            res.status(201).json(nuevoFuncionario);

        } catch (error) {
            res.status(500).json({ error: "Error al crear el funcionario" });
            console.log(error)
        }
    },

    //Funcionario by id
    getFuncionarioById: async (req, res) => {
        const { id } = req.params;
        
        try {
            const funcionario = await funcionarioService.obtenerFuncionarioPorId(id);

            
        if (!funcionario) {
            res.status(404).json({ error: "Funcionario no encontrado" });
        } else {
                res.status(200).json(funcionario);
        }
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el funcionario" });
        }
    },

     // Actualizar un funcionario por ID
     updateFuncionarioById: async (req, res) => {
      try{
        const { id } = req.params;
        const { nombre, apellido1, apellido2, fechaNacimiento, sexo} = req.body;

        await funcionarioService.actualizarFuncionario(id, {nombre, apellido1, apellido2, fechaNacimiento, sexo});
        res.json({message: "Funcionario actualizado con exito!"});

      }catch (error) {
            res.status(500).json({error: "Error al actualizar el funcionario"});
      }
    },

     // Eliminar un rol por ID
     deleteFuncionarioById: async (req, res) => {
       
        try{
            const { id } = req.params;
            await funcionarioService.borrarFuncionario(id);
            res.json({ message: 'Funcioanrio borrado correctamente' });

       } catch (error) {
            res.status(500).json({ error: "Error al borrar el funcionario" });
        }
    }
}

export default funcionarioController;