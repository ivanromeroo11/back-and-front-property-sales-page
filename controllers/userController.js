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
     
    console.log(req.csrfToken())

    res.render('auth/registro', {
        pagina: 'Crear cuenta',
        csrfToken: req.csrfToken() 
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
            csrfToken: req.csrfToken(),
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
            csrfToken: req.csrfToken(),
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
    
//Función que comprueba una cuenta 

const confirmar = async (req, res) => {
    const { token } = req.params; // Capturando el token de los parámetros de la ruta

    try {
        const usuario = await Usuario.findOne({ where: { token } });

        if (!usuario) {
            return res.render('auth/confirmar-cuenta', {
                pagina: 'Error al confirmar tu cuenta',
                mensaje: 'Token no válido o expirado.',
                error: true
            });
        }
        // Confirmar cuenta 
        usuario.confirmado = true; // Cambia esto según tu estructura de datos
        usuario.token = null;
        await usuario.save();

        return res.render('auth/confirmar-cuenta', {
            pagina: 'Cuenta confirmada',
            mensaje: 'Tu cuenta ha sido confirmada con éxito.',
            error: false
        });
    } catch (error) {
        console.error('Error al confirmar la cuenta:', error);
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al procesar tu solicitud.',
            error: true
        });
    }

    
};




const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu Cuenta',
        csrfToken: req.csrfToken(), 
    })
}

const resetPassword = async (req, res) => {
       //Validación

    await check('email').isEmail().withMessage('Eso no parece un email').run(req);
   
    let resultado = validationResult(req);

    // Verificar que el resultado no este vacío

    if(!resultado.isEmpty()) {
        //Errores
       return res.render('auth/olvide-password', {
        pagina: 'Recupera tu Cuenta',
        csrfToken: req.csrfToken(), 
        errores: resultado.array()
       })
    }
    
    // Buscar al usuario
}

export{
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
}