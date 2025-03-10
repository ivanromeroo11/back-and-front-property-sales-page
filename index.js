// Requerir y definir en una variable con Comonjs

//const express = require('express')

// Importar con ESM 

import express from 'express'
import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import appRoutes from './routes/appRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import db from './config/db.js'


// Crear la app para llamar a express 

const app = express()

//Habilitar lectura y datos de formularios

app.use( express.urlencoded({extended:true}) )



//Habilitar Cookie Parser

app.use( cookieParser() )

//Habilitar CSRF

app.use( csurf({cookie: true}))

//Conexión a la base de datos

try {
    await db.authenticate();
    db.sync();
    console.log('Conexión correcta a la base de datos')
    
} catch (error) {
    console.log(error)
    
}





// Routing
app.use('/', appRoutes)
app.use('/auth', userRoutes)
app.use('/', propiedadesRoutes)
app.use('/api', apiRoutes)

// Habilitar Pug

app.set('view engine', 'pug')
app.set('views', './views')


//Carpeta pública
app.use( express.static('public') )


// Definir puerto y arrancarlo

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Funciona en el puerto ${port}`)

});


