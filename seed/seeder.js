import { exit } from 'node:process';
import categorias from './categorias.js';
import precios from './precios.js';
import Categoria from '../models/Categoria.js';
import Precio from '../models/Precio.js';
import db from '../config/db.js';


const importarDatos = async () => {
    try{

        //Auntentificar 
        await db.authenticate();

        //Generar columnas
        await db.sync();

        //Insertar datos
        
        await Promise.all([

           Categoria.bulkCreate(categorias),
           Precio.bulkCreate(precios)
        ]); 
        console.log('Datos insertados correctamente');
        exit(0);

    }
    catch(error){
        console.log(error)
        exit(1)
    }
};


const eliminarDatos = async () => {

    try {
        await Promise.all([
            Categoria.destroy({where: {}, truncate: true}),
            Precio.destroy({where: {}, truncate: true})
        ])   
        console.log('Datos eliminados correctamente')
        exit()
    } catch (error) {
        console.log(error)
        exit(1)   
    }


}


if(process.argv[2] === '-i') {
    importarDatos()
};

if(process.argv[2] === '-e') {
    eliminarDatos()
};
