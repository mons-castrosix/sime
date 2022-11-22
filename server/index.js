const express= require('express')
const app = express()
const bodyParser= require('body-parser')
const cors =require('cors')
const mysql= require('mysql')
const db= mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    database:'sime'
})

/*
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

*/
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.post('/upload',)
app.post('/api/insert/',(req,res)=>{
    
    const apaterno= req.body.apaterno
    
    const amaterno= req.body.amaterno
    const nombres= req.body.nombres
    const calle= req.body.calle
    const numero=req.body.numero
    const colonia=req.body.colonia
    const cp=req.body.cp
    const ciudad= req.body.ciudad
    const clave_elector=req.body.clave_elector
    const curp=req.body.curp
    const fecha_nacimiento=req.body.fecha_nacimiento
    const seccion= req.body.seccion
    const distrito_federal=req.body.distrito_federal
    const distrito_local=req.body.distrito_local
    const nivel= req.body.nivel
    const no_celular= req.body.no_celular
    const facebook = req.body.facebook
    const twitter= req.body.twitter
    const otra_red= req.body.otra_red
    const descripcion_apoyo= req.body.descripcion_apoyo
    const monto_apoyo = req.body.monto_apoyo
    const alcance_apoyo=req.body.alcance_apoyo
    const contacto =req.body.contacto
    const no_celcontacto=req.body.no_celcontacto

    const sqlInsert="INSERT INTO apoyo (apaterno,amaterno,nombres,calle,numero,colonia,cp,ciudad,clave_elector,curp,fecha_nacimiento,seccion,distrito_federal,distrito_local,nivel,no_celular,facebook,twitter,otra_red,descripcion_apoyo,monto_apoyo,alcance_apoyo,contacto,no_celcontacto) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    db.query(sqlInsert,[apaterno,amaterno,nombres,calle,numero,colonia,cp,ciudad,clave_elector,curp,
        fecha_nacimiento,seccion,distrito_federal,distrito_local,nivel,no_celular,facebook,twitter,
        otra_red,descripcion_apoyo,monto_apoyo,alcance_apoyo, contacto,no_celcontacto],(err,result) =>{
          
          console.log(err)
        });
});
app.listen(3001,()=>{
    console.log('Your server is running')
});

