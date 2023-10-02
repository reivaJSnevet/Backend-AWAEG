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
Clase.hasMany(Nota);
Nota.belongsTo(Clase);

//Relacion uno a mucho entre materia y clase
Materia.hasMany(Clase);
Clase.belongsTo(Materia);

//Relacion uno a uno entre calse y funcionario
Funcionario.hasMany(Clase);
Clase.belongsTo(Funcionario);

//Relacion uno a muchos entre prematricula y estudiante
Estudiante.hasMany(Prematricula);
Prematricula.belongsTo(Estudiante);


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
};
