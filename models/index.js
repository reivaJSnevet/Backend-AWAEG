import Rol from "./Rol.js";
import Usuario from "./Usuario.js";
import Estudiante from "./Estudiante.js";
import Encargado from "./Encargado.js";
import Grupo from "./Grupo.js";
import Horario from "./Horario.js";
import Prematricula from "./Prematricula.js";
import Funcionario from "./Funcionario.js";
import Nota from "./Nota.js";
import Clase from "./Clase.js";
import Materia from "./Materia.js";
import Solicitud from "./Solicitud.js";
import Archivo from "./Archivo.js";
import Cita from "./Cita.js";

//Relación de uno a muchos entre Rol y Usuario
Rol.hasMany(Usuario);
Usuario.belongsTo(Rol);

//Relacion uno a uno entre estudiante y usuario
Usuario.hasOne(Estudiante);
Estudiante.belongsTo(Usuario);

//Relacion uno a mucho entre estudiante y encargado
Encargado.hasMany(Estudiante);
Estudiante.belongsTo(Encargado);

//Relacion de uno a muchos entre estudiante y grupo
Grupo.hasMany(Estudiante, { foreignKey: "seccion" });
Estudiante.belongsTo(Grupo, { foreignKey: "seccion" });

//Relaciones de uno a uno entre grupo y horario
Horario.hasOne(Grupo);
Grupo.belongsTo(Horario);

//Relacion de uno a uno de funcionario y usuario
Usuario.hasOne(Funcionario);
Funcionario.belongsTo(Usuario);

//Relacion de uno a muchos entre Nota y Funcionario
Funcionario.hasMany(Nota);
Nota.belongsTo(Funcionario);

//Relacion de uno a muchos entre estudiante y nota
Estudiante.hasMany(Nota);
Nota.belongsTo(Estudiante);

//Relacion de uno a muchos entre  Grupo y Funcionario
Funcionario.hasMany(Grupo/* , { foreignKey: "ProfesorGuia" } */);
Grupo.belongsTo(Funcionario/* , { foreignKey: "ProfesorGuia" } */);

//Relacion uno a mucho entre horario y clase
Horario.hasMany(Clase);
Clase.belongsTo(Horario);

//Relacion uno a mucho entre clase y nota
/* Clase.hasMany(Nota); */  Materia.hasMany(Nota);
/* Nota.belongsTo(Clase); */Nota.belongsTo(Materia);

//Relacion uno a mucho entre materia y clase
Materia.hasMany(Clase);
Clase.belongsTo(Materia);

//Relacion uno a uno entre calse y funcionario
Funcionario.hasMany(Clase);
Clase.belongsTo(Funcionario);

//Relacion uno a muchos entre prematricula y estudiante
Estudiante.hasMany(Prematricula);
Prematricula.belongsTo(Estudiante);

//Relacion uno a uno entre solicitud y nota
Solicitud.hasOne(Nota);
Nota.belongsTo(Solicitud);

//Relacion uno a uno entre solicitud y Prematricula
Solicitud.hasOne(Prematricula);
Prematricula.belongsTo(Solicitud);

//Relacion uno a uno entre solicitud y archivo
Solicitud.hasOne(Archivo);
Archivo.belongsTo(Solicitud);

//Relacion uno a muchos entre cita y funcionario
Funcionario.hasMany(Cita);
Cita.belongsTo(Funcionario);

//Relacion uno a muchos entre cita y estudiante
Estudiante.hasMany(Cita);
Cita.belongsTo(Estudiante);

//Relacion uno a uno entre solicitud y cita
Solicitud.hasOne(Cita);
Cita.belongsTo(Solicitud);

//Relacion uno a uno entre Funcionario y archivo
Funcionario.hasMany(Archivo);
Archivo.belongsTo(Funcionario);

//Relacion uno a uno entre solicitud y prestamo
/* Solicitud.hasOne(Prestamo);
Prestamo.belongsTo(Solicitud); */





export {
	Rol,
	Usuario,
	Estudiante,
	Encargado,
	Grupo,
	Horario,
	Prematricula,
	Funcionario,
	Nota,
	Clase,
    Materia,
    Solicitud,
    Archivo,
    Cita,
};
