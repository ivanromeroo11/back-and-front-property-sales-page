import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
    
    res.send('Hello world in express')
      
});

router.post('/', (req, res) => {
    res.json({msg:'Mama tengo la puerta abierta para fumar no para que me hables que me distraes, gracias '})

});




export default router