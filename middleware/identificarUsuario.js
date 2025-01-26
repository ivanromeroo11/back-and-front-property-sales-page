import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const identificarUsuario = async (req, res, next) => {

    // Identificar si hay un token 
    const token = req.cookies._token;

    if (!token) {
        req.usuario = null;
        return next();
    }
    // Comprobar el token 
    const { id } = jwt.verify(token, process.env.SECRETA);

    const usuario = await Usuario.findByPk(id);

    req.usuario = usuario;

    next();
};

export default identificarUsuario;