import { DataTypes } from 'sequelize'
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
})

export default Ususario


