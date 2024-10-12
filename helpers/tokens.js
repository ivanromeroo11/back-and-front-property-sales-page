import jwt from 'jsonwebtoken'

const generarJWT = datos => jwt.sign({ id: datos.id, nombre: datos.nombre }, process.env.JWT_SECRET, {expiresIn: '8h'});
   


const generarId = () => Math.random().toString(32).substring(2) + Date.now().toString(32);

export {
    generarJWT,
    generarId,
}