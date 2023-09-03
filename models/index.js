import Rol from "./Rol.js";
import Usuario from "./Usuario.js";
import Estudiante from "./Estudiante.js";
import Grupo from "./Grupo.js";
import Horario from "./Horario.js";
import Prematricula from "./Prematricula.js";
import Funcionario from "./Funcionario.js";
import Encargado from "./Encargado.js";
import Nota from "./Nota.js";




// Definir la relación de muchos a muchos entre Rol y Usuario
Rol.belongsToMany(Usuario, { through: 'RolUsuario' });
Usuario.belongsToMany(Rol, { through: 'RolUsuario' });

//Relacion uno uno entre estudiante y usuario
Usuario.hasOne(Estudiante);
Estudiante.belongsTo(Usuario);

//Relacion de uno a muchos entre estudiante y grupo
Grupo.hasMany(Estudiante);
Estudiante.belongsTo(Grupo);

//Relaciones de uno a uno entre grupo y horario
Horario.hasOne(Grupo);
Grupo.belongsTo(Horario)


//Relacion de uno a uno de funcionario y usuario
Usuario.hasOne(Funcionario);
Funcionario.belongsTo(Usuario);

//Relacion de uno a muchos entre Nota y Funcionario

Funcionario.hasMany(Nota);
Nota.belongsTo(Funcionario);

//Relacion de uno a muchos entre  Grupo y Funcionario
Funcionario.hasMany(Grupo, { foreignKey: 'ProfesorGuia'});
Grupo.belongsTo(Funcionario, { foreignKey: 'ProfesorGuia'});

//Relacion de una a muchos entre Estudiantes y Encargados
Encargado.hasMany(Estudiante);
Estudiante.belongsTo(Encargado);





export {
    Rol,
    Usuario,
    Estudiante,
    Grupo,
    Horario,
    Prematricula, 
    Funcionario,
    Encargado,
    Nota

}