import { exit } from 'node:process';
import categorias from './categorias.js';
import precios from './precios.js';
import usuarios from './usuarios.js';
import db from '../config/db.js';
import { Categoria, Precio, Usuario, Propiedad } from '../models/index.js';


const importarDatos = async () => {
    try{

        //Auntentificar 
        await db.authenticate();

        //Generar columnas
        await db.sync();

        //Insertar datos
        
        await Promise.all([

           Categoria.bulkCreate(categorias),
           Precio.bulkCreate(precios), 
           Usuario.bulkCreate(usuarios)
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
        await db.authenticate();
        await db.sync({force: true});
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
