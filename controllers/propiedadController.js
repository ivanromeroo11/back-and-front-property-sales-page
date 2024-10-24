import Categoria from '../models/Categoria.js';
import  Precio  from '../models/Precio.js';



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
        categorias,
        precios

    });
}

export{
    admin,
    crear,
}