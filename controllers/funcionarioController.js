import {Funcionario} from "../models/index.js";


const funcionarioController = {
    //obtener all funcionarios
    getAllFuncionarios: async (req, res) => {
        try {
            const funcionarios = await Funcionario.findAll();
            res.status(200).json(funcionarios);
        }catch (error) {
            res.status(500).json({ error: "Error al obtener los funcionarios" });
        }
    },

    // Crear un nuevo funcionario
    // createFuncionario: async (req, res) => {
    //     try {
    //         const { id, nombre, apellido1, apellido2, fechaNacimiento, sexo } = req.body;

    //         const nuevoEstudiante = await Estudiante.create({
    //             id,
    //             nombre,
    //             apellido1,
    //             apellido2,
    //             fechaNacimiento,
    //             sexo,
    //         });
                        
    //         res.status(201).json(nuevoEstudiante);

    //     } catch (error) {
    //         res.status(500).json({ error: "Error al crear el estudiante" });
    //         console.log(error)
    //     }
    // },
}