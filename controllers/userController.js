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

const registrar = (req, res) => {
     console.log(req.body)
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