// 1 importar librerias
let express = require('express');
let Sequelize = require('sequelize')

let server = express(); //instancia
server.use(express.json()); //middelware

let db = new Sequelize ( //db database o base de datos
    "mysql://root:220713@localhost:3306/storage" //se creo la cadena de conexion
)

server.listen(5000,()=>{
    console.log("servidor inicio a escuchar");

    db.authenticate() //esta invocacion de metodo promesa es la conexion a la base de datos
    .then (()=>{
        console.log ("Base de datos conectada ok")
    })
    .catch ((error)=>{
        console.log (error)
    })   
})