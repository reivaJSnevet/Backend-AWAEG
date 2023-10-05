const estudiantes =  [
    {
        //1
        "id":"198765432",
        "nombre":"Patricia",
        "apellido1":"Perez",
        "apellido2":"Guerrero",
        "fechaNacimiento":"1990-01-01",
        "sexo":false,
        "direccion":"San Jose",
        "usuarioId":"3",
        "encargadoId":"222222222",
        "seccion":"1-1"
    },
    {
        //2
        "id":"298765432",
        "nombre":"Tomas",
        "apellido1":"Yglesias",
        "apellido2":"Gonzalez",
        "fechaNacimiento":"1990-01-01",
        "sexo":true,
        "direccion":"San Jose, mi casa",
        "usuarioId":"8",
        "encargadoId":"112345678",
        "seccion":"1-1"
    },
    {
        //3
        "id":"398765432",
        "nombre":"Maria",
        "apellido1":"Vargas",
        "apellido2":"Alcocer",
        "fechaNacimiento":"1990-01-01",
        "sexo":false,
        "direccion":"San Jose",
        "usuarioId":"9",
        "encargadoId":"111234567",
        "seccion":"1-1"
    },
    {
        //4
        "id":"498765432",
        "nombre":"Ana",
        "apellido1":"Vallejos",
        "apellido2":"Villafuerte",
        "fechaNacimiento":"1990-01-01",
        "sexo":false,
        "direccion":"San Jose, sucasa",
        "usuarioId":"10",
        "encargadoId":"111123456",
        "seccion":"1-2"
    },
    {
        //5
        "id":"354789876",
        "nombre":"Lupe Tatiana",
        "apellido1":"Hernandez",
        "apellido2":"Ramirez",
        "fechaNacimiento":"2000-07-17",
        "sexo":false,
        "direccion":"Del banco por 25 metros al sur",
        "usuarioID":"11",
        "encargadoID":"111112345",
        "seccion":"1-2"
    },
    {
        //6
        "id":"508020321",
        "nombre":"Tatiana Valentina",
        "apellido1":"Fauces",
        "apellido2":"Cortes",
        "fechaNacimiento":"2000-02-27",
        "sexo":false,
        "direccion":"Por la pulperia la esquina 25 metros al sur",
        "usuarioID":"15",
        "encargadoID":"111111234",
        "seccion":"1-2"
    },
    {
        //7
        "id":"504300600",
        "nombre":"Davis",
        "apellido1":"Solera",
        "apellido2":"Acuña",
        "fechaNacimiento":"2007-02-27",
        "sexo":true,
        "direccion":"Barrio Guayabal, 100 metros al sur de la escuela",
        "usuarioID":"16",
        "encargadoID":"111111123",
        "seccion":"2-1"
    },
    {
        //8
        "id":"202025656",
        "nombre":"Faucebio",
        "apellido1":"Alvarez",
        "apellido2":"Alvarez",
        "fechaNacimiento":"2008-12-24",
        "sexo":true,
        "direccion":"Barrio Guayabal, 972 metros al sur de la escuela, 70 sur y 2 oeste",
        "usuarioID":"17",
        "encargadoID":"111111112",
        "seccion":"2-1"
    },
    {
        //9
        "id":"330037821",
        "nombre":"Eusebio",
        "apellido1":"Mora",
        "apellido2":"Guti",
        "fechaNacimiento":"2009-01-01",
        "sexo":true,
        "direccion":"Barrio Guayabal, 70 sur y 2 oeste de la casa de Faucebio",
        "usuarioID":"18",
        "encargadoID":"111111121",
        "seccion":"2-1"
    },
    {
        //10
        "id":"330099876",
        "nombre":"Cachorrao",
        "apellido1":"Que",
        "apellido2":"hizo",
        "fechaNacimiento":"2001-11-11",
        "sexo":true,
        "direccion":"Estadio Monumental, Argentina",
        "usuarioID":"19",
        "encargadoID":"111111211",
        "seccion":"2-2"
    },
    {
        //11
        "id":"448880901",
        "nombre":"Carlos",
        "apellido1":"Pele",
        "apellido2":"Messi",
        "fechaNacimiento":"2001-11-11",
        "sexo":true,
        "direccion":"Brasilia, Precario",
        "usuarioID":"20",
        "encargadoID":"111112111",
        "seccion":"2-2"
    },
    {
        //12
        "id":"768686659",
        "nombre":"Sergio",
        "apellido1":"Piedra",
        "apellido2":"Piedra",
        "fechaNacimiento":"2009-11-29",
        "sexo":true,
        "direccion":"Santa Ana, 100 metros al sur de la escuela",
        "usuarioID":"21",
        "encargadoID":"111121111",
        "seccion":"2-2"
    },
    {
        //13
        "id":"101010101",
        "nombre":"Lionel Andres",
        "apellido1":"Messi",
        "apellido2":"Cuchitini",
        "fechaNacimiento":"1987-06-24",
        "sexo":true,
        "direccion":"Barcelona, España",
        "usuarioID":"22",
        "encargadoID":"111211111",
        "seccion":"3-1"
    },
    {
        //14
        "id":"707070707",
        "nombre":"Cristiano Ronaldo",
        "apellido1":"Dos Santos",
        "apellido2":"Aveiro",
        "fechaNacimiento":"1985-02-05",
        "sexo":true,
        "direccion":"Turin, Italia",
        "usuarioID":"23",
        "encargadoID":"112111111",
        "seccion":"3-1"
    },
    {
        //15
        "id":"504280160",
        "nombre":"Neymar",
        "apellido1":"Da Silva",
        "apellido2":"Junior",
        "fechaNacimiento":"1992-02-05",
        "sexo":true,
        "direccion":"Paris, Francia",
        "usuarioID":"24",
        "encargadoID":"121111111",
        "seccion":"3-1"
    },
    {
        //16
        "id":"682734902",
        "nombre":"Maison",
        "apellido1":"Blanca",
        "apellido2":"Vaca",
        "fechaNacimiento":"2009-02-05",
        "sexo":true,
        "direccion":"Barrio Guayabal, 100 metros al sur de la escuela escandinaba",
        "usuarioID":"25",
        "encargadoID":"211111111",
        "seccion":"3-2"
    },
    {
        //17
        "id":"504389204",
        "nombre":"Daisy",
        "apellido1":"Baltodano",
        "apellido2":"Vargas",
        "fechaNacimiento":"2006-11-05",
        "sexo":false,
        "direccion":"El Cacao",
        "usuarioID":"26",
        "encargadoID":"426920101",
        "seccion":"3-2"
    },
    {
        //18
        "id":"654324499",
        "nombre":"Geaninia",
        "apellido1":"Gonzales",
        "apellido2":"Aveirao",
        "fechaNacimiento":"2009-09-15",
        "sexo":false,
        "direccion":"Santa Cruz, del banco nacional 100 metros al sur, 200 metros al oeste",
        "usuarioID":"27",
        "encargadoID":"705726390",
        "seccion":"3-2"
    },
    {
        //19
        "id":"378351293",
        "nombre":"Pablo",
        "apellido1":"Fausebio",
        "apellido2":"Valladares",
        "fechaNacimiento":"2001-09-15",
        "sexo":true,
        "direccion":"Santa Cruz, del banco nacional 100 metros al sur, 200 metros al oeste",
        "usuarioID":"28",
        "encargadoID":"106270739",
        "seccion":"4-1"
    },
    {
        //20
        "id":"382942376",
        "nombre":"Ramón",
        "apellido1":"Ramirez",
        "apellido2":"Dos Santos",
        "fechaNacimiento":"2001-09-15",
        "sexo":true,
        "direccion":"Santa Cruz, del super mitio 100 metros al sur, 200 metros al oeste",
        "usuarioID":"29",
        "encargadoID":"322087388",
        "seccion":"4-1"
    },
    {
        //21
        "id":"498764575",
        "nombre":"Jakot",
        "apellido1":"Santana",
        "apellido2":"Santana",
        "fechaNacimiento":"2001-09-15",
        "sexo":true,
        "direccion":"un hueco",
        "usuarioID":"30",
        "encargadoID":"272242415",
        "seccion":"4-1"
        
    },
    {
        //22
        "id":"435629898",
        "nombre":"Eusebio",
        "apellido1":"Canales",
        "apellido2":"Cuti",
        "fechaNacimiento":"2001-09-20",
        "sexo":true,
        "direccion":"Chepe, por donde cheepen los chepes, 100 metros al sur",
        "usuarioID":"31",
        "encargadoID":"205460219",
        "seccion":"4-2"
    },
    {
        //23
        "id":"267321309",
        "nombre":"Yader",
        "apellido1":"Guada",
        "apellido2":"Orbita",
        "fechaNacimiento":"2011-09-20",
        "sexo":true,
        "direccion":"Jh, mi casita :3",
        "usuarioID":"32",
        "encargadoID":"302148735",
        "seccion":"4-2"
    },
    {
        //23
        "id":"487290909",
        "nombre":"Ronald",
        "apellido1":"Acuña",
        "apellido2":"Cubero",
        "fechaNacimiento":"2011-01-20",
        "sexo":true,
        "direccion":"Jh,no es mi casita >:v",
        "usuarioID":"33",
        "encargadoID":"605468319",
        "seccion":"4-2"
    },
    {
        //24
        "id":"683712320",
        "nombre":"Petronila",
        "apellido1":"Perez",
        "apellido2":"Gamboa",
        "fechaNacimiento":"2001-02-20",
        "sexo":false,
        "direccion":"Australia, 100 metros al sur de la escuela escandinaba",
        "usuarioID":"34",
        "encargadoID":"481320101",
        "seccion":"5-1"
    },
    {
        //25
        "id":"398370102",
        "nombre":"Carmen",
        "apellido1":"Cadenita",
        "apellido2":"Perdio",
        "fechaNacimiento":"2002-03-20",
        "sexo":false,
        "direccion":"Australia, 100 metros al sur de la escuela escandinaba",
        "usuarioID":"35",
        "encargadoID":"481320101",
        "seccion":"5-1"
    },
    {
        //26
        "id":"72341026",
        "nombre":"Margarita",
        "apellido1":"Flor",
        "apellido2":"Urbina",
        "fechaNacimiento":"2003-04-20",
        "sexo":false,
        "direccion":"Australia, 26 metros al sur de la escuela escandinaba",
        "usuarioID":"36",
        "encargadoID":"563636347",
        "seccion":"5-1"
    },
    {
        //27
        "id":"490131001",
        "nombre":"Daysina",
        "apellido1":"Lukes",
        "apellido2":"Fowks",
        "fechaNacimiento":"2001-05-20",
        "sexo":false,
        "direccion":"Australia, 130 metros al sur de la escuela escandinaba",
        "usuarioID":"37",
        "encargadoID":"506270799",
        "seccion":"5-2"
    },
    {
        //28
        "id":"202040601",
        "nombre":"Ala",
        "apellido1":"Free",
        "apellido2":"Fire",
        "fechaNacimiento":"2001-06-20",
        "sexo":false,
        "direccion":"Por mi casa, a la par de mi casa",
        "usuarioID":"38",
        "encargadoID":"555270739",
        "seccion":"5-2"
    },
    {
        //29
        "id":"501302902",
        "nombre":"Pepe",
        "apellido1":"Perez",
        "apellido2":"Perez",
        "fechaNacimiento":"2001-07-20",
        "sexo":true,
        "direccion":"Residencia los pepes",
        "usuarioID":"39",
        "encargadoID":"522080388",
        "seccion":"5-2"
    },
    {
        //30
        "id":"520227923",
        "nombre":"Enrique",
        "apellido1":"Cubero",
        "apellido2":"Cobra",
        "fechaNacimiento":"2001-08-20",
        "sexo":true,
        "direccion":"Residencia los pepes",
        "usuarioID":"40",
        "encargadoID":"572242410",
        "seccion":"6-1"
    },
    {
        //31
        "id":"520220301",
        "nombre":"Margarititi",
        "apellido1":"Flor",
        "apellido2":"Picasso",
        "fechaNacimiento":"2001-09-20",
        "sexo":false,
        "direccion":"Residencia los pepes",
        "usuarioID":"41",
        "encargadoID":"572242410",
        "seccion":"6-1"
    },
    {
        //32
        "id":"509011921",
        "nombre":"Kike",
        "apellido1":"Gonza",
        "apellido2":"Gonzo",
        "fechaNacimiento":"2001-05-23",
        "sexo":true,
        "direccion":"Residencia los pepes, n12",
        "usuarioID":"42",
        "encargadoID":"505110219",
        "seccion":"6-1"
    },
    {
        //33
        "id":"501239044",
        "nombre":"Javier",
        "apellido1":"Gama",
        "apellido2":"Oper",
        "fechaNacimiento":"2001-05-23",
        "sexo":true,
        "direccion":"Residencia los pepes, n24",
        "usuarioID":"43",
        "encargadoID":"502040735",
        "seccion":"6-2"
    },
    {
        //34
        "id":"505349844",
        "nombre":"Kale",
        "apellido1":"Jijaija",
        "apellido2":"Indemio",
        "fechaNacimiento":"2001-05-23",
        "sexo":true,
        "direccion":"Residencia los pepes,n87",
        "usuarioID":"44",
        "encargadoID":"605462319",
        "seccion":"6-2"
    },
    {
        //35
        "id":"501239844",
        "nombre":"Karmen",
        "apellido1":"Gonza",
        "apellido2":"karma",
        "fechaNacimiento":"2001-05-23",
        "sexo":false,
        "direccion":"Residencia los pepes, n24",
        "usuarioID":"45",
        "encargadoID":"481990101",
        "seccion":"6-2"
    },
    {
        //36
        "id":"528381293",
        "nombre":"Javier",
        "apellido1":"Goma",
        "apellido2":"segundo",
        "fechaNacimiento":"2001-05-23",
        "sexo":true,
        "direccion":"Residencia los pepes, n24",
        "usuarioID":"46",
        "encargadoID":"481990101",
        "seccion":"6-2"
    }

]

export default estudiantes;