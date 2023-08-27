import express from "express";
import db from "./config/db.js";
import { estudianteRoutes, grupoRoutes, horarioRoutes, rolRoutes, usuarioRoutes} from "./routes/index.js";

import './tasks/actualizadorEdades.js';



//Creacion de la app
const app = express()

//habilitar lectura de datos de en la soliccitud URL 
app.use( express.urlencoded({ extended: true }))

//habilita lectura de json en URL
app.use(express.json());

//Conexion a la Base de datos
try {
    
    await db.authenticate();
    console.log('Conexion Correcta a la Base de datos ')

    try{
       db.sync({force: false})
    }catch(error){
        console.log(error)
    }
    
    
} catch (error) {
    console.log(error)
}


//Rutas
app.use("/api/", estudianteRoutes)
app.use("/api/", grupoRoutes)
app.use("/api/", horarioRoutes)
app.use("/api/", rolRoutes)
app.use("/api/", usuarioRoutes)


//definir puerto y inicializacion del server
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`El server esta funcionando correctamente. Puerto:${port}`)
});