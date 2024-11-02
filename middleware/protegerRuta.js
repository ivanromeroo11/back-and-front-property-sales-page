import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';

const protegerRuta = async (req, res, next) => {

    // Verificar si hay token
    const { _token } = req.cookies;
    if(!_token){
        return res.redirect('/auth/login')
    }

    //Comporbar el token 
    try {
       const decoded = jwt.verify(_token, process.env.JWT_SECRET)
       const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id)

       //Almacenar usuario en la request
       if(usuario){
        req.usuario = usuario

       }else{
           return res.redirect('/auth/login')
       }
       return next();
       
    } catch (error) {
        console.log(error)
        return res.clearCookie('_token').redirect('/auth/login')
    }
   

    next();
}


export default protegerRuta;