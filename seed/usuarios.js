import {Rol} from '../models/index.js'
import faker from 'faker';

const usuarios = async () => {
  const users = [];
  
  for (let i = 0; i < 50; i++) {
    const nombre = faker.name.firstName();
    const correo = faker.internet.email();
    const contraseña = 'password'; 
    const rol = Math.floor(Math.random() * 4) + 1

    users.push({
      nombre,
      correo,
      contraseña,
      roleId: rol
    })
  }

  return users;
}

export default usuarios
