// Requerir y definir en una variable con Comonjs

//const express = require('express')

// Importar con ESM 

import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'


// Crear la app para llamar a express 

const app = express()

// Routing

app.use('/', usuarioRoutes)



// Definir puerto y arrancarlo

const port = 3000;

app.listen(port, () => {
    console.log(`Funciona en el puerto ${port}`)

});


