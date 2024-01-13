const roles = [
    {
        //1
        roleName: "superAdmin",
        privilegeLevel: 1,
        description: "In case of emergency",
    },
    {
        //2
		roleName: "Directora",
		privilegeLevel: 1,
		description: "Este rol tiene acceso a todo el aplicativo y lo gestiona",
	},
	{
        //3
		roleName: "Director",
		privilegeLevel: 1,
		description: "Este rol tiene acceso a todo el aplicativo y lo gestiona",
	},
	{
        //4
		roleName: "Secretaria",
		privilegeLevel: 2,
		description: "Este rol solo puede generar reportes y ayudar al director",
	},
    {
        //5
		roleName: "Secretario",
		privilegeLevel: 2,
		description: "Este rol solo puede generar reportes y ayudar al director",
	},
	{
        //6
		roleName: "Maestra",
		privilegeLevel: 3,
		description:
			"Este rol puede generar solicitudes, repositorios y administrar sus clases",
	},
    {
        //7
		roleName: "Maestro",
		privilegeLevel: 3,
		description:
			"Este rol puede generar solicitudes, repositorios y administrar sus clases",
	},
	{
        //8
		roleName: "Estudiante",
		privilegeLevel: 4,
		description: "Este rol solo puede ver su perfil de estudiante",
	},
];

export default roles;
