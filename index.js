//Creando servidor
const express = require('express')

//crear servidor de express
const app = express()

//rutas
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg:'Hola'
    })
})

app.listen(6321, ()=>{
    console.log('Servidor corriendo')
})