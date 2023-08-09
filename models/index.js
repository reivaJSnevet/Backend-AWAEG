import Rol from "./Rol.js";
import Usuario from "./Usuario.js";
import Estudiante from "./Estudiante.js";


// Definir la relación de muchos a muchos entre Rol y Usuario
Rol.belongsToMany(Usuario, { through: 'RolUsuario' });
Usuario.belongsToMany(Rol, { through: 'RolUsuario' });

//Relacion uno uno entre estudiante y usuario
Usuario.hasOne(Estudiante);   
Estudiante.belongsTo(Usuario);




export {
    Rol,
    Usuario,
    Estudiante
}


