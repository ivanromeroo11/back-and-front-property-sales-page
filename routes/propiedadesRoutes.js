import express from 'express';
import { body } from 'express-validator';
import { admin, crear, guardar, agregarImagen } from '../controllers/propiedadController.js';
import protegerRuta from '../middleware/protegerRuta.js';
import upload from '../middleware/subirImagen.js'; 


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
        body('precio').notEmpty().withMessage('El precio es obligatorio'),
        body('categoria').notEmpty().withMessage('La categoría es obligatoria'),
        body('habitaciones').notEmpty().withMessage('Selecciona numero de habitaciones'),
        body('aparcamiento').notEmpty().withMessage('Selecciona si tiene aparcamiento'),
        body('wc').notEmpty().withMessage('Selecciona numero de baños'),
        body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
        guardar
);

router.get('/propiedades/agregar-imagen/:id',
    protegerRuta,
    agregarImagen);

router.post('/propiedades/agregar-imagen/:id', 
    upload.single('imagen')
);



export default router