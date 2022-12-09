const express= require('express')
const app = express()
const multer = require('multer')
const bodyParser= require('body-parser')
const cors =require('cors')
const vision= require('@google-cloud/vision')
const mysql= require('mysql')

const db= mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'sime123',
    database:'sime'
})

/*
const db= mysql.createConnection({
  user:'root',
  host:'localhost',
  password:'',
  database:'sime'
})*/


const credential= JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "jadels-cloud",
    "private_key_id": "763adede8a33608f0ea561840c67e4acb72fcd2e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDjL/d0eq0RdMmc\npZ1c9aZr57qj4nb7esPutDyXGBRtNaVfMwONYO1QEx+JtM0WBCjw1srLFGEq+YiQ\nR0iLc+Mv2sW+wMPqCBs+MyqqfMrFYnvZYkceChCIuIvgBAAjBAmWSe769XZWQDmL\nw7ykTScxWELyux40AprPYw4qsFDeK0MAq03Xdkru944eniSAN7LUrh2bYxCBwoZa\n45lgak1AggXUguyL3NRx+fPxEiA1Hj2hlqKiKBp7x5jNByO0nhPAYeQNJR1oZzob\nLV0n6utIFcI+0GcOjfAbUqaWIy0yQsWa9bb/RFm2ZQfRxW0Ew8/0f8ZbwHFb9mlF\nAu8jMjmLAgMBAAECggEAYHAOl1ux1pygLoYg0AKYw+pIkGPEBQk+XbgVlj/K//bL\nPaeOhPeVlS2g8BgXDJb0eBN9XwpGGvN01GXl9ghZ8ojn8wqpv1D0m4klvdweSP5+\nuy7cKHS2QwsvmQaptjNzDGBS+SW0N3Wo19rdW1NC5U/lj1r9va8zXwBZ1aYllcCz\nrLUlyeqxekNn1U59y8+HCeBVcTNt3ZKheIOE2vdeSBAZ8mrY3IDuoAoPHW2bUtIW\nmbPPVjdZRnMB8ISmXlWpB7tWbotfXWBVd8i4sfrmtiBrUQu4hhFaT1Winr9S1ltI\nOyXHochpWipZ+QL3i6Qjzsw0kHeQiT717Sw39m4gvQKBgQD34LTTfuF4efpAws7O\n7Zphtf3lIJ1sLtlVAu4rSftgC0OgTLrR14d62JX+EUw7n+DoSNN0soRqnv3v3g9P\nGHZQakQONGQS96lYgdYXkeq/PmpjlwqL5J66Vd6U11mQNrb15CK/jvUBkkxYm6qB\n6o60Q4jgC8sNwEbH/ru7zurjVwKBgQDqobOLwFhjRHjYWweCDaKttDFWivNd7Vw8\n7FbeVf/5QRe15uzEkHAGox/rCeYHeUQJs7/xy4YUO4MpvHKCqP36KMwKTzTQcP4y\nWzE3ZiAdmWuHuGyC8vY0b21l7Yj+pyIqO2ZXarbw8UVa6VT5cWanNe5jj8UWOpD4\nqWqdJMkO7QKBgFS/wDN7cw1k7voLYPgA5sK3nYokX45oaigVq2ajkc2hrEp3UXyD\nay/GM2o9ccoE/LmOhLWmf32QxJOpYaSSYYlW+9O7d+fAQ2ceZRuD6TXf2jIYpyNz\nVA2zZDmRc27KNj3V9Ud3Ui9qXK4C8wYeMxJQ8NBhV9howAqK/pbUxRxbAoGALvxa\nvC20hYx8trbj9gNNBIQFLVN+EN0rj3e0namTLRL/8Ilh+KsEBBA+oA7HZc++9EJu\nubkMDJkuVvlJ5Sh6U9I/qgDajrNR9DuWy4VEASlsAy3HbSHCdBWsTrEWsgg+Kz7h\n67ePEwj93orDXYB8EhgWuRFdYmowBdvHYdiv+rECgYAEn7WcT8mfwMfMJGRkDE5B\nkmsZhuW0kistndkgS0PZq9Z3ZUh/IYyAUCjNpsbDjuAwxvNWpcAG16Uppf29QzZE\nj2DXS1Czvxk9n56z3cdwNtPS64oj8bThh6zPT1Vznk4xCsITD/CsCwsfz0Cj3YMA\nua+t7Ki3G/An3cfsMBh/bg==\n-----END PRIVATE KEY-----\n",
    "client_email": "siterr@jadels-cloud.iam.gserviceaccount.com",
    "client_id": "105277006141061737708",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/siterr%40jadels-cloud.iam.gserviceaccount.com"
}));

const config = {
    credentials:{
        private_key:credential.private_key,
        client_email:credential.client_email
    }
};


const client= new vision.ImageAnnotatorClient(config);
const detectTextD= async (file_path)=>{
    let obj={}
    let [result] = await client.documentTextDetection(file_path);
    const full= result.fullTextAnnotation;
    //console.log(full)
    var cleanText= full.text;
    
    var x= cleanText.split(" ")
    var y= cleanText.split("\n")
    
    
    const msg = new String(y);
    console.log(`Result: ${msg}`);

    let arr= msg.split(",")
    console.log(arr);
    

    
    nombre= arr.indexOf('NOMBRE')
    console.log(nombre)
    console.log('DATOS NOMBRE:')
    
    for (i=nombre+1;i<nombre+4; i++){
        
        if(i == nombre+1){
            obj['apaterno']=arr[i]
            console.log(arr[i])
        }
        else if (i == nombre+2){
            obj['amaterno']=arr[i]
            console.log(arr[i])
        }
        else if (i == nombre+3){
            obj['nombres']=arr[i]
            console.log(arr[i])
        }
    }
    
    console.log("\n")
    
    domicilio= arr.indexOf('DOMICILIO')
    console.log('DATOS DOMICILIO:')
    //console.log(domicilio)

    for (i=domicilio+1;i<domicilio+4; i++){
        if(i == domicilio+1){
            let num=""
            var x= arr[i].split(" ");
            console.log(x)
            for (k=1;k<x.length-1;k++){
                num+=x[k]+" "
            }

            obj['calle']=num
            obj['numero']=x[x.length-1]
            console.log(arr[i])
        }
        else if(i == domicilio+2){
            let b=""
            var a= arr[i].split(" ")
            console.log(a)
            
            for (j=1;j<a.length-1;j++){
                //console.log(a[j])
                b+=a[j]+" "
            }
            obj['colonia']=b
            obj['cp']=a[a.length-1]
            
        }
        else if(i== domicilio+3){
            obj['ciudad']=arr[i]
            console.log(arr[i])
        }
        
        
    }
    console.log("\n")



    console.log('CLAVE DE ELECTOR:')
    for (i=0;i<arr.length;i++){
        //console.log('Renglon'+i+" "+arr[i])
        var a= arr[i].split(" ")
       
        if(a.includes('ELECTOR')){
            console.log(a)
            console.log(a[3]);
            obj['c_elector']=a[3]
        }
    }
    
    console.log("\n")
    console.log('CURP:')
    for (i=0;i<arr.length;i++){
        //console.log('Renglon'+i+" "+arr[i])
        var a= arr[i].split(" ")
        if(a.includes('CURP')){
            console.log(a[1]);
            obj['curp']=a[1]
        }
    }

    if(obj['curp'] == undefined){
        curp= arr.indexOf('CURP')
        console.log(arr[curp+1])
        obj['curp']=arr[curp+1]
    }
    console.log("\n")


    console.log('FECHA DE NACIMIENTO:')
    fecha= arr.indexOf('FECHA DE NACIMIENTO')
    console.log(fecha)
    for (i=fecha+1;i<fecha+2; i++){
        
        console.log(arr[i])
        obj['fecha_nacimiento']=arr[i]
    }
    console.log("\n")

    console.log('SECCION:')
    for (i=0;i<arr.length;i++){
        //console.log('Renglon'+i+" "+arr[i])
        var a= arr[i].split(" ")
        if(a.includes('SECCIÓN')){
            console.log(a[3]);
            obj['seccion']=a[3]
        }
    }
    if(obj['seccion'] == undefined){
        
        secc= arr.indexOf('SECCIÓN')
        console.log(arr[secc+1])
        obj['seccion']=arr[secc+1]
    }
    console.log(obj)
    return obj;

    /*
    for (i=0;i<arr.length;i++){
        console.log('Renglon'+i+" "+arr[i])
        var a= arr[i].split(" ")
        if(a.includes('CURP')){
            console.log(a);
        }
    }
    */
        
};
const detectTextG= async (file_path)=>{
    let obj={}
    let [result] = await client.documentTextDetection(file_path);
    const full= result.fullTextAnnotation;
    //console.log(full)
    var cleanText= full.text;
    
    var x= cleanText.split(" ")
    var y= cleanText.split("\n")
    
    
    const msg = new String(y);
    console.log(`Result: ${msg}`);

    let arr= msg.split(",")
    console.log(arr);
    

    
    nombre= arr.indexOf('NOMBRE')
    console.log(nombre)
    console.log('DATOS NOMBRE:')
    
    for (i=nombre+1;i<nombre+4; i++){
        
        if(i == nombre+1){
            obj['apaterno']=arr[i]
            console.log(arr[i])
        }
        else if (i == nombre+2){
            obj['amaterno']=arr[i]
            console.log(arr[i])
        }
        else if (i == nombre+3){
            obj['nombres']=arr[i]
            console.log(arr[i])
        }
    }
    
    console.log("\n")
    
    domicilio= arr.indexOf('DOMICILIO')
    console.log('DATOS DOMICILIO:')
    //console.log(domicilio)

    for (i=domicilio+1;i<domicilio+4; i++){
        if(i == domicilio+1){
            let num=""
            var x= arr[i].split(" ");
            console.log(x)
            for (k=1;k<x.length-1;k++){
                num+=x[k]+" "

                
            }
            console.log(num)
            obj['calle']=num
            obj['numero']=x[x.length-1]
            //console.log(arr[i])
        }
        else if(i == domicilio+2){
            let b=""
            var a= arr[i].split(" ")
            console.log(a)
            
            for (j=1;j<a.length-1;j++){
                //console.log(a[j])
                b+=a[j]+" "
            }
            obj['colonia']=b
            obj['cp']=a[a.length-1]
            
        }
        else if(i== domicilio+3){
            obj['ciudad']=arr[i]
            console.log(arr[i])
        }
        
        
    }
    console.log("\n")



    console.log('CLAVE DE ELECTOR:')
    for (i=0;i<arr.length;i++){
        //console.log('Renglon'+i+" "+arr[i])
        var a= arr[i].split(" ")
       
        if(a.includes('ELECTOR')){
            console.log(a[3]);

            obj['c_elector']=a[3]
        }
    }
    console.log()
    console.log("\n")
    console.log('CURP:')
    curp= arr.indexOf('CURP')
    console.log(arr[curp+1])
    obj['curp']=arr[curp+1]
    console.log("\n")


    console.log('FECHA DE NACIMIENTO:')
    fecha= arr.indexOf('FECHA DE NACIMIENTO')
    console.log(fecha)
    for (i=fecha+1;i<fecha+2; i++){
        
        console.log(arr[i])
        obj['fecha_nacimiento']=arr[i]
    }
    console.log("\n")

    console.log('SECCION:')
    secc= arr.indexOf('SECCIÓN')
    console.log(arr[secc+1])
    obj['seccion']=arr[secc+1]
    console.log(obj)
    return obj;

    /*
    for (i=0;i<arr.length;i++){
        console.log('Renglon'+i+" "+arr[i])
        var a= arr[i].split(" ")
        if(a.includes('CURP')){
            console.log(a);
        }
    }
    */
        
};

//console.log(client)
/*
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

*/
app.use(cors());
app.use(express.static("./public"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

//Setting storage engine
const storageEngine = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

//initializing multer
const upload = multer({
  storage: storageEngine,
});

//@type   POST
//route for post data
app.post("/uploadD", upload.single('file'), (req, res) => {
  if (!req.file) {
      console.log("No file upload");
  } else {
      console.log(req.file.filename)
      var imgsrc = req.file.filename
      console.log(imgsrc)
      var insertData = "INSERT INTO img_ine(ruta)VALUES(?);"
      db.query(insertData, [imgsrc], (err, result) => {
          if (err) throw err
          console.log("file uploaded")
      })

      //'http://127.0.0.1:3000/images/'
      const sqlInsert="SELECT MAX(id) as id FROM img_ine; "
      
      db.query(sqlInsert,(err,result) =>{
        const sqlInsert2="SELECT ruta from img_ine WHERE id="+result[0].id
        db.query(sqlInsert2,(err,result) =>{
          ruta='./images/'+result[0].ruta
          console.log(ruta)
          const data='';
          detectTextD(ruta).then( (x) =>
            res.send(JSON.stringify(x))
            
          )
          
          

        })

      });

  }
});

app.post('/api/distritos/',(req,res)=>{
  const seccion= req.body.seccion
  console.log(seccion)
  const sqlInsert="SELECT df,dl FROM secc_distrito WHERE secc ="+seccion+" ;"
  console.log(sqlInsert)
  db.query(sqlInsert,(err,result) =>{
        res.send(result[0])
        console.log(result[0].dl)
        console.log(err)
      });
})
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
          
          if(err){
            console.log(err);
          }
          else{
            res.send("Values Inserted");
          }
        });
});

app.get('/apoyos',(req,res) =>{
    db.query("SELECT *FROM apoyo",(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})
app.listen(3001,()=>{
    console.log('Your server is running')
});

