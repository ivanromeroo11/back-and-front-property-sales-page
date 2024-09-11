// Requerir y definir en una variable con Comonjs

//const express = require('express')

// Importar con ESM 

import express from 'express'
import userRoutes from './routes/userRoutes.js'
import db from './config/db.js'


//Conexión a la base de datos

try {
    await db.authenticate();
    console.log('Conexión correcta a la base de datos')
    
} catch (error) {
    console.log(error)
    
}


// Crear la app para llamar a express 

const app = express()

//Habilitar lectura y datos de formularios

app.use( express.urlencoded({extended:true}) )

// Routing

app.use('/auth', userRoutes)

// Habilitar Pug

app.set('view engine', 'pug')
app.set('views', './views')


//Carpeta pública
app.use( express.static('public') )


// Definir puerto y arrancarlo

const port = 3000;

app.listen(port, () => {
    console.log(`Funciona en el puerto ${port}`)

});


