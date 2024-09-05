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

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu Cuenta' 
    })
}

export{
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
}