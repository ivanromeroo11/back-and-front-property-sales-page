import express from 'express';
import { body } from 'express-validator';
import { admin, crear, guardar, agregarImagen, almacenarImagen, editar, guardarCambios, eliminar, mostrarPropiedad, enviarMensaje } from '../controllers/propiedadController.js';
import protegerRuta from '../middleware/protegerRuta.js';
import upload from '../middleware/subirImagen.js'; 
import identificarUsuario from '../middleware/identificarUsuario.js';


const router = express.Router();


router.get('/mis-propiedades', protegerRuta, admin);
router.get('/propiedades/crear', protegerRuta, crear);

// Validación de los campos 
router.post('/propiedades/crear',
        protegerRuta,
        body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
        body('descripcion')
            .notEmpty().withMessage('La descripción no puede ir vacía')
            .isLength({ max: 200 }).withMessage('La descripción es muy larga'),
        body('precio').isNumeric().withMessage('El precio es obligatorio'),
        body('categoria').isNumeric().withMessage('La categoría es obligatoria'),
        body('habitaciones').isNumeric().withMessage('Selecciona numero de habitaciones'),
        body('aparcamiento').isNumeric().withMessage('Selecciona si tiene aparcamiento'),
        body('wc').isNumeric().withMessage('Selecciona numero de baños'),
        body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
        guardar
);

router.get('/propiedades/agregar-imagen/:id',
    protegerRuta,
    agregarImagen);

router.post('/propiedades/agregar-imagen/:id',
    protegerRuta,
    upload.single('imagen'),
    almacenarImagen
);

router.get('/propiedades/editar/:id',
    protegerRuta,
    editar
);

router.post('/propiedades/editar/:id',
    protegerRuta,
    body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
    body('descripcion')
        .notEmpty().withMessage('La descripción no puede ir vacía')
        .isLength({ max: 200 }).withMessage('La descripción es muy larga'),
    body('precio').isNumeric().withMessage('El precio es obligatorio'),
    body('categoria').isNumeric().withMessage('La categoría es obligatoria'),
    body('habitaciones').isNumeric().withMessage('Selecciona numero de habitaciones'),
    body('aparcamiento').isNumeric().withMessage('Selecciona si tiene aparcamiento'),
    body('wc').isNumeric().withMessage('Selecciona numero de baños'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    guardarCambios
);

router.post('/propiedades/eliminar/:id',
    protegerRuta,
    eliminar
);


// Area Publica 

router.get('/propiedad/:id',
    identificarUsuario,
    mostrarPropiedad

);

// Almacenar los mensajes

router.post('/propiedad/:id',
    identificarUsuario,
    body('mensaje').usLength({min: 10}).withMessage('El mensajeno puede ir vacío o es muy corto'),
    enviarMensaje

);


export default router