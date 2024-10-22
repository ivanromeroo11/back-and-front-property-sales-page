import { exit } from 'node:process';
import categorias from './categorias.js';
import Categoria from '../models/Categoria.js';
import db from '../config/db.js';


const importarDatos = async () => {
    try{

        //Auntentificar 
        await db.authenticate()

        //Generar columnas
        await db.sync()

        //Insertar datos
        await Categoria.bulkCreate(categorias)
        console.log('Datos insertados correctamente')
        exit(0)

    }
    catch(error){
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === '-i') {
    importarDatos()
}