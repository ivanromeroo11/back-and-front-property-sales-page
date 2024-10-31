import { validationResult } from 'express-validator';
import { Precio, Categoria, Propiedad } from '../models/index.js';



const admin = (req, res) => {
    res.render('propiedades/admin',{
        pagina: 'Mis Propiedades',
        barra: true,
        
    });
}

// Formulario para crear una propiedad

const crear = async (req, res) => {

    // Consultar Modelo de precio y categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ]);

    res.render('propiedades/crear',{
        pagina: 'Crear Propiedad',
        barra: true,
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: {}

    });
}

const guardar = async (req, res) => {

    // Validación

    let resultado = validationResult(req);

    if(!resultado.isEmpty()) {

        //Consultar Modelo de precio y categorias

        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ]);

        return  res.render('propiedades/crear',{
            pagina: 'Crear Propiedad',
            barra: true,
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        });
    }

    // Crear un Registro 
    const { titulo, descripcion, habitaciones, aparcamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId } = req.body;
   
    try {
       const propiedadGuardada = await Propiedad.create({
        titulo,
        descripcion,
        habitaciones,
        aparcamiento,
        wc,
        calle,
        lat,
        lng,
        precioId,
        categoriaId


       });  
    } catch (error) {
        console.log(error);
    }
}

export{
    admin,
    crear,
    guardar,
}