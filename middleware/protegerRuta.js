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
       const usuario = await Usuario.findByPk(decoded.id)
       

       console.log(usuario)
       
    } catch (error) {
        console.log(error)
        return res.clearCookie('_token').redirect('/auth/login')
    }
   

    next();
}


export default protegerRuta;