import { check, validationResult } from 'express-validator'
import Usuario from "../models/Usuario.js"


const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    })
}


const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear cuenta' 
    })
}

const registrar = async (req, res) => {
    //Validación
    await check('nombre').notEmpty().withMessage('El Nombre es obligatorio').run(req);
    await check('email').isEmail().withMessage('Eso no parece un email').run(req);
    await check('password').isLength({min: 6 }).withMessage('Escribe al menos 6 caracteres en el password').run(req);
    await check('repetir_password').equals('password').withMessage('Los password no coinciden').run(req);

    let resultado = validationResult(req);

    // Verificar que el resultado no este vacío

    if(!resultado.isEmpty()) {
        //Errores
       return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: resultado.array()
       })
    }
   
    

    const usuario = await Usuario.create(req.body)

    res.json(usuario)
}
    


const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu Cuenta' 
    })
}

export{
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword,
}