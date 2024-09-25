import { check, validationResult } from 'express-validator'
import Usuario from "../models/Usuario.js"
import { generarId } from '../helpers/tokens.js'
import {  emailRegistro } from '../helpers/emails.js'


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
            errores: resultado.array(),
            usuario: {
                nombre:  req.body.nombre,
                email : req.body.email
            }
       })
    }

    //Extraer los datos 

    const { nombre, email, password } = req.body
   
    //Verificar que el usuario no este duplicado 
    const existeUsuario = await Usuario.findOne( {  where : { email } })

    if(existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: [{msg: 'el Ususario ya esta registrado'}],
            usuario: {
                nombre:  req.body.nombre,
                email : req.body.email
            }
       })
    }

   //Almacenar un Usuario
   const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId()
   })

   //Enviar email de confirmación 
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
     })




    //Mostrar mensaje de confirmacion
        res.render('templates/mensaje',{
            pagina: 'Cuenta creada correctamente',
            mensaje: 'Hemos enviado un Email de confirmación, presiona en el enlace'
})
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