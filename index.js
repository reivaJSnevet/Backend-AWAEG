import express from "express";
import db from "./config/db.js";
import usuarioRouter from "./routes/usuarioRoutes.js";
import rolRouter from "./routes/rolRoutes.js";
import estudianteRouter from "./routes/estudianteRoutes.js";

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
       db.sync() 
    }catch(error){
        console.log(error)
    }
    
    
} catch (error) {
    console.log(error)
}


//Rutas
app.use("/api/", usuarioRouter)
app.use("/api/", rolRouter)
app.use("/api/", estudianteRouter)


//definir puerto y inicializacion del server
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`El server esta funcionando correctamente. Puerto:${port}`)
});