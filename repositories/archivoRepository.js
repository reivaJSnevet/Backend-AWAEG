import { Archivo } from "../models/index.js";

const archivoRepository = {
    crear: async (archivo) => {
        const nuevoArchivo = await Archivo.create(archivo);
        return nuevoArchivo;
    },

    obtenerTodos: async () => {
        const archivos = await Archivo.findAll();
        return archivos;
    },

    obtenerPorId: async (id) => {
        const archivo = await Archivo.findByPk(id);
        return archivo;
    },

    obtenerPorIdTodos: async(id) =>{
        const archivos = await Archivo.findAll({
            where:{
                idFuncionario:id
            }
        });
        return archivos;
    },

    borrar: async (id) => {
        const archivo = await Archivo.destroy({
            where: {
                id: id,
            },
        });
        return archivo;
    }


}

export default archivoRepository;