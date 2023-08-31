import Rol from "./Rol.js";
import Usuario from "./Usuario.js";
import Estudiante from "./Estudiante.js";
import Encargado from "./Encargado.js";
import Grupo from "./Grupo.js";
import Horario from "./Horario.js";
import Prematricula from "./Prematricula.js";
import Clase from "./Clase.js";
import Nota from "./Nota.js";


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
Grupo.hasMany(Estudiante, {foreignKey: 'seccion'});
Estudiante.belongsTo(Grupo, {foreignKey: 'seccion'});

//Relacion de uno a uno entre grupo y horario
Horario.hasOne(Grupo);
Grupo.belongsTo(Horario);

//Relacion uno a mucho entre horario y clase
Horario.hasMany(Clase);
Clase.belongsTo(Horario);

//Relacion uno a mucho entre clase y nota
Clase.hasMany(Nota);
Nota.belongsTo(Clase);

//Relacion de uno a uno entre prematricula y estudiante



export {
    Rol,
    Usuario,
    Estudiante,
    Encargado,
    Grupo,
    Horario,
    Prematricula,
    Clase,
    Nota,
}