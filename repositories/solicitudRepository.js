import {
	Nota,
	Solicitud,
	Archivo,
	Prematricula,
} from "../models/index.js";

const solicitudRepository = {
	ObtenerTodos: async () => {
		const notas = await Nota.findAll({
			include: [{ model: Solicitud, where: { estado: false } }],
		});

		const archivos = await Archivo.findAll({
			include: [{ model: Solicitud, where: { estado: false } }],
		});

		const prematriculas = await Prematricula.findAll({
			include: [{ model: Solicitud, where: { estado: false } }],
		});

		const solicitudesSeparadas = {
			notas,
			archivos,
			prematriculas,
		};

		console.log(solicitudesSeparadas);

		return solicitudesSeparadas;
	},
};

export default solicitudRepository;
