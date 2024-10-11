import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import Usuario from "../models/Usuario.js"
import { generarId } from '../helpers/tokens.js'
import {  emailRegistro, emailOlvidePassword } from '../helpers/emails.js'


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

    const { email } = req.body;

    const usuario = await Usuario.findOne({ where: { email } })

    if(!usuario){
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu Cuenta',
            csrfToken: req.csrfToken(), 
            errores: [{msg: 'No existe ninguna cuenta con ese email'}]
           })

    }

    //Generar un token

    usuario.token = generarId();
    await usuario.save();
 
    //Enviar un email

    emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    })
    
    //Renderizar un mensaje

    res.render('templates/mensaje', {
        pagina: 'Restablece tu password enviado',
        mensaje: 'Hemos enviado un email para restablecer tu password'
    })
}

const comprobarToken = async (req, res) => {

    const { token } = req.params;

    const usuario = await Usuario.findOne({ where: { token } });

    if(!usuario){
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al restablecer tu password',
            mensaje: 'Hubo un error al procesar tu solicitud, intenta de nuevo',
            error: true
        })
    }

    //Mostrar formulario para restablecer el password

    res.render('auth/reset-password',{
        pagina: 'Restablece tu password',
        csrfToken: req.csrfToken()
    })

}

const nuevoPassword = async (req, res) => {

    // Validar nuevo password
    await check('password').isLength({min: 6}).withMessage('El password debe ser de la menos 6 caracteres').run(req);

    let resultado = validationResult(req);

    // Verificar que le resultado no este vacío
    if(!resultado.isEmpty()){
        return res.render('auth/reset-password', {
            pagina: 'Restablece tu password',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }

    const { token } = req.params;
    const { password } = req.body;


    //Identificar el quien hace le cambio

    const usuario = await Usuario.findOne({ where: { token } });

    console.log(usuario)



    // Hashear el nuevo password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null;

    await usuario.save();

    res.render('auth/confirmar-cuenta',{
        pagina: 'Password actualizado',
        mensaje: 'Tu password se ha actualizado correctamente'
    })


}

export{
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
    comprobarToken,
    nuevoPassword
}