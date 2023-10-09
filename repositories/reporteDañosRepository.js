import ReporteDaños from "../models/ReporteDaños.js";
import Prestamo from "../models/Prestamo.js";
import Funcionario from "../models/Funcionario.js";

const reporteDañosRepository = {
    crearReporteDaños: async (reporteDaños) => {
        const nuevoReporteDaños = await ReporteDaños.create(reporteDaños);
        return nuevoReporteDaños;
    },

    obtenerTodos: async () => {
        const reporteDaños = await ReporteDaños.findAll({
             include:[
                {
                    model: Prestamo,
                    attributes: ["id", "fechPrestamo", "fechDevolucion", "estado", "averias", "funcionarioId"],
                    include: [
                        {
                            model: Funcionario,
                            attributes: ["nombre","apellido1", "apellido2"]
                        }
                    ]
                    
                }
            ] 
        });
        return reporteDaños;
    },

    obtenerPorId: async (id) => {
        const reporteDaños = await ReporteDaños.findByPk(id,{
            include:[
                {
                    model: Prestamo,
                    attributes: ["id", "fechPrestamo", "fechDevolucion", "estado", "averias", "funcionarioId"],
                    include: [
                        {
                            model: Funcionario,
                            attributes: ["nombre","apellido1", "apellido2"]
                        }
                    ]
                }
            ]
        });
        return reporteDaños;
    },

    actualizar: async (id, nuevosDatos) => {
        const reporteDaños = await ReporteDaños.findByPk(id);
        if (!reporteDaños) {
            return reporteDaños;
        }
        await reporteDaños.update(nuevosDatos);
        return reporteDaños;
    },

    borrar: async (id) => {
        const reporteDaños = await ReporteDaños.findByPk(id);
        if (!reporteDaños) {
            return reporteDaños;
        }
        return await reporteDaños.destroy();
    },
};

export default reporteDañosRepository;