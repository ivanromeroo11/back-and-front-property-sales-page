import express from 'express'
import { formularioLogin, formularioRegistro, registrar, confirmar, formularioOlvidePassword, resetPassword, comprobarToken, nuevoPassword } from '../controllers/userController.js';

const router = express.Router();

router.get('/login', formularioLogin)
router.get('/registro', formularioRegistro)
router.post('/registro', registrar)


router.get('/confirmar/:token', confirmar)



router.get('/olvide-password', formularioOlvidePassword)

router.post('/olvide-password', resetPassword)

// Almacenar nuevo password en la base de datos

router.get('/olvide-password/:token', comprobarToken)

router.post('/olvide-password/:token', nuevoPassword)





export default router