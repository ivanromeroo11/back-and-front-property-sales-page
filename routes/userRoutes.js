import express from 'express'
import { formularioLogin, formularioRegistro, registrar, confirmar, formularioOlvidePassword, resetPassword } from '../controllers/userController.js';

const router = express.Router();

router.get('/login', formularioLogin)
router.get('/registro', formularioRegistro)
router.post('/registro', registrar)


router.get('/confirmar/:token', confirmar)



router.get('/olvide-password', formularioOlvidePassword)

router.post('/olvide-password', resetPassword)



export default router