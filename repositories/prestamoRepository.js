import Funcionario from "../models/Funcionario.js";
import Prestamo from "../models/Prestamo.js";

const prestamoRepository = {
    crear: async (prestamo) => {
        const nuevoPrestamo = await Prestamo.create(prestamo);
        return nuevoPrestamo;
    },

    obtenerTodos: async () => {
        const prestamos = await Prestamo.findAll({
            include:[
                {
                    model: Funcionario,
                    attributes: ["id", "nombre", "apellido1", "apellido2"],
                }
            ]
        });
    return prestamos;
    },

    obtenerPorId: async (id) => {
        const prestamo = await Prestamo.findByPk(id,{
            include:[
                {
                    model: Funcionario,
                    attributes: ["id", "nombre", "apellido1", "apellido2"],
                }
            ]
        });
        return prestamo;
    },

    actualizar: async (id, nuevosDatos) => {
        const prestamo = await Prestamo.findByPk(id);
        if (!prestamo) {
            return prestamo;
        }
        await prestamo.update(nuevosDatos);
        return prestamo;
    },

    borrar: async (id) => {
        const prestamo = await Prestamo.findByPk(id);
        if (!prestamo) {
            return prestamo;
        }
        return await prestamo.destroy();
    },
};

export default prestamoRepository;