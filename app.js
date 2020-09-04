let express= require("express");
let Sequelize= require("sequelize");
const { error } = require("console");

let server = express();
server.use (express.json ());

let db = new Sequelize ( //db database o base de datos
    "mysql://root:220713@localhost:3306/storage" //se creo la cadena de conexion
);
//funcion para traer la informacion de la BD 
server.get("/users",(req,res,next)=>{
    db.query('select * from user;', {type: Sequelize.QueryTypes.SELECT})
    .then((users)=>{
        res.json(users)
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
    })
});

server.get("/users/:dni",(req,res,next)=>{
    let dni= req.params.dni; //Traer el DNI del parametro que esta recibiendo 
    db.query('select * from user where dni= :dniSeguro;',
    {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {dniSeguro:dni} //Reemplazar el dniSeguro por el DNI 
    })
    .then((users)=>{
        res.json(users)
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
    })
});

server.post("/users/",(req,res,next)=>{
    let name= req.body.name;
    let dni= req.body.dni;
    let phoneNumber= req.body.phoneNumber;
    let email= req.body.email;
    let address= req.body.address;
    
    db.query("INSERT INTO storage.user(name,dni,phone_number,email,address) " +
              "values(:safename,:safedni,:safephone,:safeemail,:safeaddress)",
    {
        type: Sequelize.QueryTypes.INSERT,
        replacements: {
            safename:name,
            safedni:dni,
            safephone:phoneNumber,
            safeemail:email,
            safeaddress:address
        } //Reemplazar los valores por los que vienen del body
    })
    .then((users)=>{
        res.json(users)
    })
    .catch((error)=>{
      res.status(500);
      res.json(error) 
    })
});


server.listen (3008, ()=>{
    console.log ("Ya estoy activo");

    db.authenticate () //esta invocacion de metodo promesa es la conexion a la base de datos
    .then (()=>{
    console.log ("Base de datos conectada")
    })
    .catch ((error)=>{
        console.log (error)
    })
});