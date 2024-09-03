// Requerir y definir en una variable con Comonjs

//const express = require('express')

// Importar con ESM 

import express from 'express'


// Crear la app para llamar a express 

const app = express()

// Routing

app.get('/', function(req, res) {
    
    res.send('Hello world in express')
      
});


// Definir puerto y arrancarlo

const port = 3000;

app.listen(port, () => {
    console.log(`Funciona en el puerto ${port}`)

});


