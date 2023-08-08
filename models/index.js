import Rol from "./Rol.js";
import Usuario from "./Usuario.js";


// Definir la relación de muchos a muchos entre Rol y Usuario
Rol.belongsToMany(Usuario, { through: 'RolUsuario' });
Usuario.belongsToMany(Rol, { through: 'RolUsuario' });


export {
    Rol,
    Usuario
}


