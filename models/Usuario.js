import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import db from '../config/db.js'

const Ususario = db.define('usuarios', {
    nombre:{
        type: DataTypes.STRING,
        allorNull: false 
    },
    email:{
        type: DataTypes.STRING,
        allorNull: false 
    },
    password:{
        type: DataTypes.STRING,
        allorNull: false 
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
}, {
    hooks: {
    beforeCreate: async function(usuario){
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash( usuario.password, salt );
    }    
    }
})

export default Ususario


