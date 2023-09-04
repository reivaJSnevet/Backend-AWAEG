const roles = [
    {
        nombre: 'Director',
        nivelPrivilegio: 1,
        descripcion: 'Este rol tiene acceso a todo el aplicativo y lo gestiona'
    },
    {
        nombre: 'Secretaria',
        nivelPrivilegio: 2,
        descripcion: 'Este rol solo puede generar reportes'
    },
    {
        nombre: 'Maestra',
        nivelPrivilegio: 3,
        descripcion: 'Este rol puede generar solicitudes, repositorios y administrar secciones'
    },
    {
        nombre: 'Estudiante',
        nivelPrivilegio: 4,
        descripcion: 'Este rol solo puede ver su perfil de estudiante'
    }
]

export default roles