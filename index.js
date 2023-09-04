import express from "express";
import cors from "cors"
import db from "./config/db.js";


import { estudianteRoutes, grupoRoutes, horarioRoutes, rolRoutes, usuarioRoutes, prematriculaRoutes, funcionarioRoutes, encargadoRoutes, notasRoutes} from "./routes/index.js";

import './tasks/actualizadorEdades.js';
import './tasks/actualizarEdadFuncionario.js'



//Creacion de la app
const app = express()


//habilitar CORS
const corsOptions = {
    origin: ['http://localhost:5173'],
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions))

//habilitar lectura de datos de en la soliccitud URL 
app.use( express.urlencoded({ extended: true }))

//habilita lectura de json en URL
app.use(express.json());

//Conexion a la Base de datos
try {  
    await db.authenticate();
    console.log('Conexion Correcta a la Base de datos ')

    try{
       await db.sync({force: false})
       console.log('Sincronización en la Base de datos exitosa')
    }catch(error){
        console.log('Error en la sincronización de la Base de datos:', error)
    }

} catch (error) {
    console.log('Error en la conexión a la Base de datos:', error)
}


//Rutas
app.use("/api/", estudianteRoutes)
app.use("/api/", grupoRoutes)
app.use("/api/", horarioRoutes)
app.use("/api/", rolRoutes)
app.use("/api/", usuarioRoutes)
app.use("/api/", prematriculaRoutes)
app.use("/api/", funcionarioRoutes)
app.use("/api/", encargadoRoutes)
app.use("/api/", notasRoutes)


//definir puerto y inicializacion del server
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`El server esta funcionando correctamente. Puerto:${port}`)
});