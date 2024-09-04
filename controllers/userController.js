const formularioLogin = (req, res) => {
    res.render('auth/login', {
        autentificado: false
    })
}


const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        
    })
}


export{
    formularioLogin,
    formularioRegistro,
}