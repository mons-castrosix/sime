const express = require('express')
const app = express()
const multer = require('multer')
const bodyParser = require('body-parser')
const cors = require('cors')
const vision = require('@google-cloud/vision')
const mysql = require('mysql')
const { response } = require('express')
const Client = require("@googlemaps/google-maps-services-js").Client;




//CONEXION BASE DE DATOS LOCAL
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'sime'
})
//CONEXION BASE DE DATOS EN SERVIDOR
/*
const db= mysql.createConnection({
  user:'root',
  host:'localhost',
  password:'sime123',
  database:'mape'
})*/



const getDriverLocationNearAddress = async (streetAddress) => {
  const geocodingClient = new Client({});
  let code = {}
  let params = {
    address: streetAddress,
    key: 'AIzaSyDZxgUG7MfFXKj_zPyvUdclvgrcKSSZsZ8',
    components: 'country:MX',
  };

  //console.log('retrieving lat, lng for ' + streetAddress);
  geocodingClient.geocode({
    params: params
  })
    .then((response) => {
      ////console.log('status: ' + response.data.status);

      ////console.log(response.data.results[0].geometry.location.lat);

      ////console.log(response.data.results[0].geometry.location.lng);
      code['lat'] = response.data.results[0].geometry.location.lat;
      code['lng'] = response.data.results[0].geometry.location.lng;
      //console.log(code)
      return code
    })
    .catch((error) => {
      //console.log('error retrieving geocoded results', error);
    });
}


const credential = JSON.parse(JSON.stringify({
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
  credentials: {
    private_key: credential.private_key,
    client_email: credential.client_email
  }
};

const client = new vision.ImageAnnotatorClient(config);
const detectTextD = async (file_path) => {
  let obj = {}
  let [result] = await client.documentTextDetection(file_path);
  const full = result.fullTextAnnotation;
  ////console.log(full)
  var cleanText = full.text;

  var x = cleanText.split(" ")
  var y = cleanText.split("\n")


  const msg = new String(y);
  //console.log(`Result: ${msg}`);

  let arr = msg.split(",")
  //console.log(arr);



  nombre = arr.indexOf('NOMBRE')
  //console.log(nombre)
  //console.log('DATOS NOMBRE:')

  for (i = nombre + 1; i < nombre + 4; i++) {

    if (i == nombre + 1) {
      obj['apaterno'] = arr[i]
      //console.log(arr[i])
    }
    else if (i == nombre + 2) {
      obj['amaterno'] = arr[i]
      //console.log(arr[i])
    }
    else if (i == nombre + 3) {
      obj['nombres'] = arr[i]
      //console.log(arr[i])
    }
  }

  //console.log("\n")

  domicilio = arr.indexOf('DOMICILIO')
  //console.log('DATOS DOMICILIO:')
  ////console.log(domicilio)

  for (i = domicilio + 1; i < domicilio + 4; i++) {
    if (i == domicilio + 1) {
      let num = ""
      var x = arr[i].split(" ");
      //console.log(x)
      for (k = 1; k < x.length - 1; k++) {
        num += x[k] + " "
      }

      obj['calle'] = num
      obj['numero'] = x[x.length - 1]
      //console.log(arr[i])
    }
    else if (i == domicilio + 2) {
      let b = ""
      var a = arr[i].split(" ")
      //console.log(a)

      for (j = 1; j < a.length - 1; j++) {
        ////console.log(a[j])
        b += a[j] + " "
      }
      obj['colonia'] = b
      obj['cp'] = a[a.length - 1]

    }
    else if (i == domicilio + 3) {
      obj['ciudad'] = arr[i]
      //console.log(arr[i])
    }


  }
  //console.log("\n")



  //console.log('CLAVE DE ELECTOR:')
  for (i = 0; i < arr.length; i++) {
    ////console.log('Renglon'+i+" "+arr[i])
    var a = arr[i].split(" ")

    if (a.includes('ELECTOR')) {
      //console.log(a)
      //console.log(a[3]);
      obj['c_elector'] = a[3]
    }
  }

  //console.log("\n")
  //console.log('CURP:')
  for (i = 0; i < arr.length; i++) {
    ////console.log('Renglon'+i+" "+arr[i])
    var a = arr[i].split(" ")
    if (a.includes('CURP')) {
      //console.log(a[1]);
      obj['curp'] = a[1]
    }
  }

  if (obj['curp'] == undefined) {
    curp = arr.indexOf('CURP')
    //console.log(arr[curp + 1])
    obj['curp'] = arr[curp + 1]
  }
  //console.log("\n")


  //console.log('FECHA DE NACIMIENTO:')
  fecha = arr.indexOf('FECHA DE NACIMIENTO')
  //console.log(fecha)
  for (i = fecha + 1; i < fecha + 2; i++) {

    //console.log(arr[i])
    obj['fecha_nacimiento'] = arr[i]
  }
  //console.log("\n")

  //console.log('SECCION:')
  for (i = 0; i < arr.length; i++) {
    ////console.log('Renglon'+i+" "+arr[i])
    var a = arr[i].split(" ")
    if (a.includes('SECCIÓN')) {
      //console.log(a[3]);
      obj['seccion'] = a[3]
    }
  }
  if (obj['seccion'] == undefined) {

    secc = arr.indexOf('SECCIÓN')
    //console.log(arr[secc + 1])
    obj['seccion'] = arr[secc + 1]
  }
  //console.log(obj)
  return obj;

  /*
  for (i=0;i<arr.length;i++){
      //console.log('Renglon'+i+" "+arr[i])
      var a= arr[i].split(" ")
      if(a.includes('CURP')){
          //console.log(a);
      }
  }
  */

};


////console.log(client)
/*
connection.connect(function(err) {
    if (err) {
      return //console.error('error: ' + err.message);
    }
  
    //console.log('Connected to the MySQL server.');
  });

*/

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

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
    //console.log("No file upload");
  } else {
    //console.log(req.file.filename)
    var imgsrc = req.file.filename
    //console.log(imgsrc)
    var insertData = "INSERT INTO img_ine(ruta)VALUES(?);"
    db.query(insertData, [imgsrc], (err, result) => {
      if (err) throw err
      //console.log("file uploaded")
    })

    //'http://127.0.0.1:3000/images/'
    const sqlInsert = "SELECT MAX(id) as id FROM img_ine; "

    db.query(sqlInsert, (err, result) => {
      const sqlInsert2 = "SELECT ruta from img_ine WHERE id=" + result[0].id
      db.query(sqlInsert2, (err, result) => {
        ruta = './images/' + result[0].ruta
        ////console.log(ruta)
        const data = '';
        detectTextD(ruta).then((x) =>
          res.send(JSON.stringify(x))
        )
      })

    });


  }
});

app.post('/api/distritos/', (req, res) => {
  const seccion = req.body.seccion
  ////console.log(seccion)
  const sqlInsert = "SELECT id,df,dl FROM secc_distrito WHERE secc =" + seccion + " ;"
  ////console.log(sqlInsert)
  if (seccion)
    db.query(sqlInsert, (err, result) => {
      if (err) {
        //console.log(err)

      }
      else {
        res.send(result[0])

      }


    });
})

app.post('/api/partidos/', (req, res) => {
  const seccion = req.body.seccion
  ////console.log(seccion)
  const sqlInsert = "SELECT * FROM partido_politico "+ " ;"
  ////console.log(sqlInsert)

    db.query(sqlInsert, (err, result) => {
      if (err) {
        console.log(err)

      }
      else {
        console.log(result)
        res.send(result)

      }


    });
})
app.post('/api/distritosAll/', (req, res) => {

  const sqlInsert = "SELECT id as value,secc as name FROM secc_distrito;";
  ////console.log(sqlInsert)
  db.query(sqlInsert, (err, result) => {
    res.send(result)
    //console.log(result[0].dl)
    //console.log(err)
  });
})
app.post('/api/promotoresAll/', (req, res) => {

  const sqlInsert = "SELECT id,CONCAT(apaterno,' ',amaterno,' ', nombres) AS nombre FROM registro_promotores;";
  ////console.log(sqlInsert)
  db.query(sqlInsert, (err, result) => {
    res.send(result)

    //console.log(err)
  });
})
app.post('/api/equipoAll/', (req, res) => {

  const sqlInsert = "SELECT *FROM equipo";
  ////console.log(sqlInsert)
  db.query(sqlInsert, (err, result) => {
    res.send(result)
    //console.log(result[0].dl)
    //console.log(err)
  });
})
app.post('/api/cont/', (req, res) => {

  const sqlInsert = "SELECT id,numero FROM casillas_cont;";
  ////console.log(sqlInsert)
  db.query(sqlInsert, (err, result) => {
    res.send(result)

    //console.log(err)
  });
})
app.post('/api/cont10/', (req, res) => {

  const sqlInsert = "SELECT * FROM casillas_cont WHERE nomenclatura BETWEEN 'C01' AND 'C10';";
  ////console.log(sqlInsert)
  db.query(sqlInsert, (err, result) => {
    res.send(result)

    //console.log(err)
  });
})
app.post('/api/esp/', (req, res) => {

  const sqlInsert = "SELECT id,numero FROM casillas_esp;";
  ////console.log(sqlInsert)
  db.query(sqlInsert, (err, result) => {
    res.send(result)

    //console.log(err)
  });
})
app.post('/api/ext/', (req, res) => {

  const sqlInsert = "SELECT id,numero FROM casillas_ext;";
  ////console.log(sqlInsert)
  db.query(sqlInsert, (err, result) => {
    res.send(result)

    //console.log(err)
  });
})
app.post('/mapa-apoyos/', (req, res) => {
  const sqlInsert = "SELECT id,CONCAT(apaterno,' ',amaterno,' ', nombres) AS nombre, lat,lng,calle,numero,colonia,cp,ciudad from apoyo;";
  //console.log(sqlInsert);
  db.query(sqlInsert, (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      res.send(JSON.stringify(result))
    }
  });
})

app.post('/mapa-estructura/', (req, res) => {
  const sqlInsert = "SELECT id,CONCAT(apaterno,' ',amaterno,' ', nombres) AS nombre, lat,lng,calle,numero,colonia,cp,ciudad from registro_estructura;";
  //console.log(sqlInsert);
  db.query(sqlInsert, (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      res.send(JSON.stringify(result))
    }
  });
})

app.post('/apoyos-view/:id', (req, res) => {
  const id = req.params.id
  db.query("SELECT *FROM apoyo a INNER JOIN apoyos ap ON a.id=ap.id_persona where a.id=?;", id, (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      var empObj = JSON.parse(resultado);
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        //console.log(empObj)*/
      res.send(resultado)
      //console.log(resultado)

    }
  })
})

app.post('/apoyos', (req, res) => {
  db.query("SELECT a.id,CONCAT(a.nombres,' ',a.apaterno,' ',a.amaterno) AS nombre,ap.tipo,ap.alcance,a.seccion FROM apoyo a INNER JOIN apoyos ap ON a.id=ap.id_persona;", (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      var empObj = JSON.parse(resultado);
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        //console.log(empObj)*/
      res.send(resultado)


    }
  })
})
app.post('/api/insert/', (req, res) => {
  //console.log(req.body)

  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const distrito_federal = req.body.distrito_federal
  const distrito_local = req.body.distrito_local
  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
  const descripcion_apoyo = req.body.descripcion_apoyo
  const apoyo_tipo = req.body.apoyo_tipo
  const monto_apoyo = req.body.monto_apoyo
  const alcance_apoyo = req.body.alcance_apoyo
  const contacto = req.body.contacto
  const no_celcontacto = req.body.no_celcontacto
  const lat = req.body.lat
  const lng = req.body.lng

  const sql2 = "SELECT max(id) as id FROM img_ine"
  const sqlInsert = "INSERT INTO apoyo (apaterno,amaterno,nombres,calle,numero,colonia,cp,ciudad,clave_elector,curp,fecha_nacimiento,seccion,distrito_federal,distrito_local,nivel,no_celular,email,facebook,twitter,otra_red,contacto,no_celcontacto,lat,lng,img) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
  const persona_id = "SELECT max(id) as id FROM apoyo"
  const sql3 = "INSERT INTO apoyos (descripcion,tipo,monto,alcance,id_persona) VALUES (?,?,?,?,?)"
  db.query(sql2, (err, result) => {
    const id_image = result[0].id
    const response = []

    db.query(sqlInsert, [
      apaterno, amaterno, nombres,
      calle, numero, colonia, cp, ciudad,
      clave_elector, curp, fecha_nacimiento,
      seccion, distrito_federal, distrito_local, nivel,
      no_celular, email, facebook, twitter, otra_red,
      contacto, no_celcontacto, lat, lng,
      id_image], (err, result) => {

        if (err) {
          //console.log(err);
        }
        else {
          response.push(true)

        }
      });
    db.query(persona_id, (err, result) => {

      const id_p = result[0].id
      db.query(sql3, [
        descripcion_apoyo, apoyo_tipo, monto_apoyo, alcance_apoyo, id_p],
        (err, result) => {

          if (err) {
            res.send(err);
          }
          else {
            response.push(true);


          }
        });
      if (response[0] == true && response[1] == true) {
        res.send("Agregado")
      }
      else {
        res.send("No Agregado")
      }

    });


  });



});
app.post('/apoyoId', (req, res) => {
  const id = req.body.id
  db.query("SELECT * FROM apoyo INNER JOIN apoyos on apoyo.id=apoyos.id_persona where apoyos.id_persona=?;",
    [id],
    (err, result) => {
      if (err) {
        //console.log(err)
      }
      else {
        res.send(result)

      }
    })

})

app.delete('/deleteApoyo/:id', (req, res) => {
  const id = req.params.id
  db.query("DELETE FROM apoyo WHERE id=?", id, (err, result) => {
    if (err) {
      //console.log(err)
      res.send(err);
    }
    else {
      //console.log(result);
      res.send({ status: 404, msg: "No user found" });
      //res.status().send(200); 
    }
  })
})

app.post('/getLoc/', (req, res) => {
  const direccion = req.body.direccion
  //console.log(direccion)
  const geocodingClient = new Client({});
  let code = {}
  let params = {
    address: direccion,
    key: 'AIzaSyDZxgUG7MfFXKj_zPyvUdclvgrcKSSZsZ8',
    components: 'country:MX',
  };

  //console.log('retrieving lat, lng for ' + direccion);
  geocodingClient.geocode({
    params: params
  })
    .then((response) => {
      ////console.log('status: ' + response.data.status);

      ////console.log(response.data.results[0].geometry.location.lat);

      ////console.log(response.data.results[0].geometry.location.lng);
      code['lat'] = response.data.results[0].geometry.location.lat;
      code['lng'] = response.data.results[0].geometry.location.lng;
      //console.log(code)
      res.send(code)
    })
    .catch((error) => {
      //console.log('error retrieving geocoded results', error);
    });




});

/*db.query("DELETE FROM apoyo WHERE id=?",id,(err,result)=>{
    if(err){
        //console.log(err)
    }
    else{
        res.send(result)
    }
})*/



/*REVISAR*/
app.post('/apoyo/detalles/:id', (req, res) => {
  //console.log(req.body)

  const id = req.params.id;
  /*
  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const distrito_federal = req.body.distrito_federal
  const distrito_local = req.body.distrito_local
  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
  const descripcion_apoyo = req.body.descripcion_apoyo
  const apoyo_tipo = req.body.apoyo_tipo
  const monto_apoyo = req.body.monto_apoyo
  const alcance_apoyo = req.body.alcance_apoyo
  const contacto = req.body.contacto
  const no_celcontacto = req.body.no_celcontacto

  db.query(
    "UPDATE apoyo a1 INNER JOIN apoyos a2 ON a1.id=a2.id_persona SET a1.apaterno=?,a1.amaterno=?,a1.nombres=?,a1.calle=?,a1.numero=?,a1.colonia=?,a1.cp=?,a1.ciudad=?,a1.clave_elector=?,a1.curp=?,a1.fecha_nacimiento=?,a1.seccion=?,a1.distrito_federal=?,a1.distrito_local=?,a1.nivel=?,a1.no_celular=?,a1.email=?,a1.facebook=?,a1.twitter=?,a1.otra_red=?,a1.contacto=?,a1.no_celcontacto=?,a2.descripcion=?,a2.tipo=?,a2.monto=?,a2.alcance=? WHERE a1.id=?;",
    [apaterno, amaterno, nombres, calle, numero, colonia, cp, ciudad, clave_elector, curp, fecha_nacimiento, seccion, distrito_federal, distrito_local, nivel, no_celular, email, facebook, twitter, otra_red, contacto, no_celcontacto, descripcion_apoyo, apoyo_tipo, monto_apoyo, alcance_apoyo, id],
    (err, result) => {
      if (err) {
        //console.log(err);
      }
      else {
        res.send(result)
        console.log(result)
      }
    }
  )
  */
 const q="SELECT * FROM apoyo a INNER JOIN apoyos ap ON a.id=ap.id_persona WHERE a.id=?;";
  db.query(
    q,id,
    
    (err, result) => {
      if (err) {
        //console.log(err);
      }
      else {
        res.send(result[0])
        //console.log(result)
      }
    }
  )


})
app.post('/apoyo/edit/:id', (req, res) => {
  console.log(req.body)

  const id = req.params.id;
  
  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const distrito_federal = req.body.distrito_federal
  const distrito_local = req.body.distrito_local
  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
  const descripcion_apoyo = req.body.descripcion_apoyo
  const apoyo_tipo = req.body.apoyo_tipo
  const monto_apoyo = req.body.monto_apoyo
  const alcance_apoyo = req.body.alcance_apoyo
  const contacto = req.body.contacto
  const no_celcontacto = req.body.no_celcontacto
  const lat = req.body.lat
  const lng= req.body.lng
  const response = []
  db.query(
    "UPDATE apoyo a1 INNER JOIN apoyos a2 ON a1.id=a2.id_persona SET a1.apaterno=?,a1.amaterno=?,a1.nombres=?,a1.calle=?,a1.numero=?,a1.colonia=?,a1.cp=?,a1.ciudad=?,a1.clave_elector=?,a1.curp=?,a1.fecha_nacimiento=?,a1.seccion=?,a1.distrito_federal=?,a1.distrito_local=?,a1.nivel=?,a1.no_celular=?,a1.email=?,a1.facebook=?,a1.twitter=?,a1.otra_red=?,a1.contacto=?,a1.no_celcontacto=?,a1.lat=?,a1.lng=?,a2.descripcion=?,a2.tipo=?,a2.monto=?,a2.alcance=? WHERE a1.id=?;",
    [apaterno, amaterno, nombres, calle, numero, colonia, cp, ciudad, clave_elector, curp, fecha_nacimiento, seccion, distrito_federal, distrito_local, nivel, no_celular, email, facebook, twitter, otra_red, contacto, no_celcontacto, lat,lng,descripcion_apoyo, apoyo_tipo, monto_apoyo, alcance_apoyo, id],
    (err, result) => {
      if (err) {
        //console.log(err);
      }
      else {
        //res.send(result)
        response.push(true);
        console.log(result)
      }
    }
  )
  if(response[0]==true){
    res.send("Editado");
  }else{
    res.send("No_editado");
  }



})

app.listen(3001, () => {
  //console.log('Your server is running')
});


//--------------------------------LIDERES TERRITORIALES-------------------------------------------------///
app.post('/api/insert-lider/', (req, res) => {
  console.log(req.body)

  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const distrito_federal = req.body.distrito_federal
  const distrito_local = req.body.distrito_local
  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
  const contacto = req.body.contacto
  const no_celcontacto = req.body.no_celcontacto
  const lat = req.body.lat
  const lng = req.body.lng
  const lider = req.body.id_tipoLider
  const id_Secc = req.body.id_Secc
  const observaciones = req.body.observaciones
  const partido_id = req.body.partido_id
  const injerencia = req.body.injerencia
  const calleIglesia = req.body.calleiglesia
  const numIglesia = req.body.no_extinglesia
  const colIglesia = req.body.coloniaIglesia
  const fiesta = req.body.fiesta_patronal
  const escuela = req.body.escuela
  const cargoesc = req.body.cargo
  const tenenciaa = req.body.tenencia
  const coloniaEncargado = req.body.coloniaEncargado
  const nombreac = req.body.nombreAc
  const nombreinst = req.body.nombre



  const sql2 = "SELECT max(id) as id FROM img_ine"
  const sqlInsert = "INSERT INTO lideres_t (nombres,apaterno,amaterno,calle,numero,colonia,cp,ciudad,fecha_nacimiento,curp,clave_electoral,seccion,id_Secc,no_celular, email,facebook,twitter,otra_red,circulo,contacto,no_celcontacto,observaciones,lat,lng,img,id_tipoLider) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
  const lider_id = "SELECT max(id) as id FROM lideres_t";
  const secc_resp = "INSERT INTO secciones_injerencia_lider (lider_id,seccion_id) VALUES (?,?) ";

  var sql3 = "";
  var parametros = [];


  db.query(sql2, (err, result) => {
    const id_image = result[0].id
    const response = []

    db.query(sqlInsert, [
      nombres, apaterno, amaterno, calle, numero, colonia, cp, ciudad, fecha_nacimiento, curp, clave_elector, seccion, id_Secc, no_celular, email, facebook, twitter, otra_red, nivel,
      contacto, no_celcontacto, observaciones, lat, lng, id_image, lider], (err, result) => {

        if (err) {
          //console.log(err);
        }
        else {
          response.push(true)

        }
      });
    db.query(lider_id, (err, result) => {

      const id_p = result[0].id
      if (lider == 1) {
        sql3 = "INSERT INTO domicilio_iglesia (calle,no_ext,colonia,fiesta_patronal,id_lider) VALUES (?,?,?,?,?)"
        parametros = [calleIglesia, numIglesia, colIglesia, fiesta, id_p]
        db.query(sql3, parametros,
          (err, result) => {

            if (err) {
              //console.log(err);
            }
            else {
              response.push(true);


            }
          });
        for (let i = 0; i < injerencia.length; i++) {
          db.query(secc_resp, [id_p, injerencia[i]], (err, result) => {
            if (err) {
              //console.log(err);
            }
            else {
              response.push(true);


            }
          })
        }
      }
      if (lider == 2) {
        sql3 = "INSERT INTO lider_partidista (partido_id,id_lider) VALUES (?,?)"
        parametros = [partido_id, id_p]
        db.query(sql3, parametros,
          (err, result) => {

            if (err) {
              //console.log(err);
            }
            else {
              response.push(true);


            }
          });
        for (let i = 0; i < injerencia.length; i++) {
          db.query(secc_resp, [id_p, injerencia[i]], (err, result) => {
            if (err) {
              //console.log(err);
            }
            else {
              response.push(true);


            }
          })
        }
      }
      if (lider == 3) {
        sql3 = "INSERT INTO cargo_escuela (nombre_escuela,cargo,id_lider) VALUES (?,?,?)"
        parametros = [escuela, cargoesc, id_p]
        db.query(sql3, parametros,
          (err, result) => {

            if (err) {
              //console.log(err);
            }
            else {
              response.push(true);


            }
          });
      }
      if (lider == 4) {
        sql3 = "INSERT INTO lider_tenencia (tenencia,id_lider) VALUES (?,?)"
        parametros = [tenenciaa, id_p]
        db.query(sql3, parametros,
          (err, result) => {

            if (err) {
              //console.log(err);
            }
            else {
              response.push(true);


            }
          });
      }
      if (lider == 5) {
        sql3 = "INSERT INTO lider_colonia  (colonia,id_lider) VALUES (?,?)"
        parametros = [coloniaEncargado, id_p]
        db.query(sql3, parametros,
          (err, result) => {

            if (err) {
              //console.log(err);
            }
            else {
              response.push(true);


            }
          });
      }
      if (lider == 6) {
        sql3 = "INSERT INTO lider_ac (nombre,cargo,id_lider) VALUES (?,?,?)"
        parametros = [nombreac, cargoesc, id_p]
        db.query(sql3, parametros,
          (err, result) => {

            if (err) {
              //console.log(err);
            }
            else {
              response.push(true);


            }
          });
      }
      if (lider == 7) {
        sql3 = "INSERT INTO lider_otra (nombre,cargo,id_lider) VALUES (?,?,?)"
        parametros = [nombreinst, cargoesc, id_p]
        db.query(sql3, parametros,
          (err, result) => {

            if (err) {
              //console.log(err);
            }
            else {
              response.push(true);


            }
          });
      }







      if (response[0] == true && response[1] == true) {
        res.send("Agregado")
      }
      else {
        res.send("No Agregado")
      }

    });


  });



});
app.post('/lideres-view/:id', (req, res) => {
  const id = req.params.id
  const sql1="SELECT id_tipoLider from lideres_t where id=?";
  const sql2='SELECT l.nombres,l.apaterno,l.amaterno,l.calle,l.numero,l.colonia,.l.cp,l.ciudad, DATE_FORMAT(fecha_nacimiento, "%d/%m/%Y") AS fecha_nacimiento,l.curp,l.clave_electoral,l.seccion,l.id_Secc,l.no_celular,l.email,l.facebook,l.twitter,l.otra_red,l.circulo,l.contacto,l.no_celcontacto,l.observaciones,l.lat,l.lng,l.id_tipoLider ,t.nombre_tipo,sd.df,sd.dl,ac.nombre AS nomas,ac.cargo AS acargo FROM lideres_t l INNER JOIN tipo_lider t ON l.id_tipoLider=t.id INNER JOIN secc_distrito sd ON l.id_Secc=sd.id INNER JOIN asociacion_civil ac ON ac.id_lider=l.id WHERE l.id=?';
  
  db.query(sql1, id, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      
      if(result[0].id_tipoLider == 1){
        const sql2='SELECT l.nombres,l.apaterno,l.amaterno,l.calle,l.numero,l.colonia,.l.cp,l.ciudad, DATE_FORMAT(fecha_nacimiento, "%d/%m/%Y") AS fecha_nacimiento,l.curp,l.clave_electoral,l.seccion,l.id_Secc,l.no_celular,l.email,l.facebook,l.twitter,l.otra_red,l.circulo,l.contacto,l.no_celcontacto,l.observaciones,l.lat,l.lng,l.id_tipoLider ,t.nombre_tipo,sd.df,sd.dl,di.calle AS calle_iglesia,di.no_ext AS no_iglesia,DATE_FORMAT(di.fiesta_patronal, "%d/%m/%Y") AS fiesta,di.colonia AS colonia_ig FROM lideres_t l INNER JOIN tipo_lider t ON l.id_tipoLider=t.id INNER JOIN secc_distrito sd ON l.id_Secc=sd.id INNER JOIN domicilio_iglesia di ON di.id_lider=l.id WHERE l.id=?'
        db.query(sql2, id, (err, resu) => {
          if (err) {
            console.log(err)
          }else{
            res.send(resu[0]);
            console.log(resu[0])
          }
        })
      }
      if(result[0].id_tipoLider == 2){
        const sql2='SELECT * FROM lideres_t re INNER JOIN secc_distrito sd ON re.id_Secc=sd.id  WHERE re.id=?'
        db.query(sql2, id, (err, resu) => {
          if (err) {
            console.log(err)
          }else{
            res.send(resu[0]);
            console.log(resu[0])
          }
        })
      }
      if(result[0].id_tipoLider == 3){
        const sql2='SELECT * FROM lideres_t re INNER JOIN secc_distrito sd ON re.id_Secc=sd.id INNER JOIN cargo_escuela ce ON re.id=ce.id_lider WHERE re.id=?'
        db.query(sql2, id, (err, resu) => {
          if (err) {
            console.log(err)
          }else{
            res.send(resu[0]);
            console.log(resu[0])
          }
        })
      }
      if(result[0].id_tipoLider == 4){
        const sql2='SELECT * FROM lideres_t re INNER JOIN secc_distrito sd ON re.id_Secc=sd.id INNER JOIN lider_tenencia ce ON re.id=ce.id_lider WHERE re.id=?'
        db.query(sql2, id, (err, resu) => {
          if (err) {
            console.log(err)
          }else{
            res.send(resu[0]);
            console.log(resu[0])
          }
        })
      }
      if(result[0].id_tipoLider == 5){
        const sql2='SELECT * FROM lideres_t re INNER JOIN secc_distrito sd ON re.id_Secc=sd.id INNER JOIN lider_colonia ce ON re.id=ce.id_lider WHERE re.id=?'
        db.query(sql2, id, (err, resu) => {
          if (err) {
            console.log(err)
          }else{
            res.send(resu[0]);
            console.log(resu[0])
          }
        })
      }
      if(result[0].id_tipoLider == 6){
        const sql2='SELECT * FROM lideres_t re INNER JOIN secc_distrito sd ON re.id_Secc=sd.id INNER JOIN lider_ac ce ON re.id=ce.id_lider WHERE re.id=?';

        db.query(sql2, id, (err, resu) => {
          if (err) {
            console.log(err)
          }else{
            res.send(resu[0]);
            console.log(resu[0])
          }
        })
      }


    }
  })
})
app.delete('/deleteLider/:id', (req, res) => {
  const id = req.params.id

  db.query("DELETE FROM lideres_t WHERE id=?", id, (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      res.send(result)
      //console.log(result)
    }
  })
})
app.post('/lideres', (req, res) => {
  db.query("SELECT l.id as id,CONCAT(l.nombres,' ',l.apaterno,' ',l.amaterno) as nombres,clave_electoral,seccion,nombre_tipo,l.no_celular FROM lideres_t l INNER JOIN tipo_lider t ON l.id_tipoLider=t.id ", (err, result) => {
    if (err) {
      res.send(err);
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      var empObj = JSON.parse(resultado);
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        //console.log(empObj)*/
      res.send(resultado)


    }
  })
})
app.post('/injerenciaLider/:id', (req, res) => {
  const id = req.params.id
  //console.log(id)
  const sqlInsert = "SELECT sie.seccion_id FROM secciones_injerencia_lider  sie INNER JOIN secc_distrito sd ON sie.seccion_id=sd.id WHERE sie.lider_id=24;";
  ////console.log(sqlInsert)
  db.query(sqlInsert, id, (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      console.log(result)
      var empObj = JSON.parse(resultado);
     
      res.send(result)


    }
  });
})



//------------------------------------ ESTRUCTURA -----------------------------------------------------///
app.post('/api/insert-estructura', (req, res) => {
  //console.log(req.body)

  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const distrito_federal = req.body.distrito_federal
  const distrito_local = req.body.distrito_local
  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
  const contacto = req.body.contacto
  const no_celcontacto = req.body.no_celcontacto
  const lat = req.body.lat
  const lng = req.body.lng
  const lider = req.body.id_tipoLider
  const id_Secc = req.body.id_Secc
  const observaciones = req.body.observaciones
  const injerencia = req.body.injerencia
  const equipo = req.body.idEquipo


  const sql2 = "SELECT max(id) as id FROM img_ine"
  const sqlInsert = "INSERT INTO registro_estructura (nombres,apaterno,amaterno,calle,numero,colonia,cp,ciudad,fecha_nacimiento,curp,clave_electoral,seccion,id_Secc,no_celular, email,facebook,twitter,otra_red,circulo,observaciones,lat,lng,img,id_equipo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
  const lider_id = "SELECT max(id) as id FROM registro_estructura";
  const secc_resp = "INSERT INTO secciones_injerencia_estructura (estructura_id,seccion_id) VALUES (?,?) ";

  db.query(sql2, (err, result) => {
    const id_image = result[0].id
    const response = []

    db.query(sqlInsert, [
      nombres, apaterno, amaterno, calle, numero, colonia, cp, ciudad, fecha_nacimiento, curp, clave_elector, seccion, id_Secc, no_celular, email, facebook, twitter, otra_red, nivel,
      observaciones, lat, lng, id_image, equipo], (err, result) => {

        if (err) {
          //console.log(err);
        }
        else {
          response.push(true)

        }
      });
    db.query(lider_id, (err, result) => {
      const id_p = result[0].id
      for (let i = 0; i < injerencia.length; i++) {
        db.query(secc_resp, [id_p, injerencia[i]], (err, result) => {
          if (err) {
            response.send(err);
          }
          else {
            response.push(true);


          }
        })
      }

    });
  });
  if (response[0] == true) {
    res.send("Agregado")
  }
  else {
    res.send("No Agregado")
  }


});
app.post('/estructura', (req, res) => {
  db.query("SELECT re.id,CONCAT(re.nombres,' ',re.apaterno,' ',re.amaterno) AS nombre, re.clave_electoral,e.nombre AS nombre_equipo,seccion FROM registro_estructura re INNER JOIN equipo e ON re.id_equipo=e.id; ", (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      var empObj = JSON.parse(resultado);
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        ////console.log(empObj)*/
      res.send(resultado)


    }
  })
})
app.post('/estructura-view/:id', (req, res) => {
  const id = req.params.id
  db.query('SELECT  nombres,apaterno,amaterno,calle,numero,colonia,cp,ciudad,DATE_FORMAT(fecha_nacimiento, "%d/%m/%Y") AS fecha_nacimiento,curp,clave_electoral,seccion, no_celular, email,facebook, twitter, otra_red, circulo,observaciones,lat,lng,id_equipo,sd.df,sd.dl FROM registro_estructura INNER JOIN secc_distrito sd ON sd.id=registro_estructura.id_Secc where registro_estructura.id=?', id, (err, result) => {
    if (err) {
      ////console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      var empObj = JSON.parse(resultado);
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        //console.log(empObj)*/
      res.send(resultado)


    }
  })
})
app.delete('/deleteEstructura/:id', (req, res) => {
  const id = req.params.id
  //console.log(req.params)
  db.query("DELETE FROM registro_estructura WHERE id=?", id, (err, result) => {
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
      //console.log(result)
    }
  })
})
app.post('/injerenciaEstructura/:id', (req, res) => {
  const id = req.params.id
  //console.log(id)
  const sqlInsert = "SELECT sie.seccion_id as value FROM secciones_injerencia_estructura  sie INNER JOIN secc_distrito sd ON sie.seccion_id=sd.id WHERE sie.estructura_id=?;";
  ////console.log(sqlInsert)
  db.query(sqlInsert, id, (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        //console.log(empObj)*/
      res.send(result)


    }
  });
})
app.post('/estructura/detalles/:id', (req, res) => {
  //console.log(req.body)

  const id = req.params.id;
  /*
  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const distrito_federal = req.body.distrito_federal
  const distrito_local = req.body.distrito_local
  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
  const descripcion_apoyo = req.body.descripcion_apoyo
  const apoyo_tipo = req.body.apoyo_tipo
  const monto_apoyo = req.body.monto_apoyo
  const alcance_apoyo = req.body.alcance_apoyo
  const contacto = req.body.contacto
  const no_celcontacto = req.body.no_celcontacto

  db.query(
    "UPDATE apoyo a1 INNER JOIN apoyos a2 ON a1.id=a2.id_persona SET a1.apaterno=?,a1.amaterno=?,a1.nombres=?,a1.calle=?,a1.numero=?,a1.colonia=?,a1.cp=?,a1.ciudad=?,a1.clave_elector=?,a1.curp=?,a1.fecha_nacimiento=?,a1.seccion=?,a1.distrito_federal=?,a1.distrito_local=?,a1.nivel=?,a1.no_celular=?,a1.email=?,a1.facebook=?,a1.twitter=?,a1.otra_red=?,a1.contacto=?,a1.no_celcontacto=?,a2.descripcion=?,a2.tipo=?,a2.monto=?,a2.alcance=? WHERE a1.id=?;",
    [apaterno, amaterno, nombres, calle, numero, colonia, cp, ciudad, clave_elector, curp, fecha_nacimiento, seccion, distrito_federal, distrito_local, nivel, no_celular, email, facebook, twitter, otra_red, contacto, no_celcontacto, descripcion_apoyo, apoyo_tipo, monto_apoyo, alcance_apoyo, id],
    (err, result) => {
      if (err) {
        //console.log(err);
      }
      else {
        res.send(result)
        console.log(result)
      }
    }
  )
  */
 const q="SELECT * FROM registro_estructura re INNER JOIN secc_distrito sd ON re.id_Secc=sd.id  WHERE re.id=?;";
  db.query(
    q,id,
    
    (err, result) => {
      if (err) {
        //console.log(err);
      }
      else {
        res.send(result[0])
        console.log(result)
      }
    }
  )


})
app.post('/estructura/edit/:id', (req, res) => {
  console.log(req.body)

  const id = req.params.id;
  
  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const id_Secc=req.body.id_Secc

  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
 

  const lat = req.body.lat
  const lng= req.body.lng
  const equipo=req.body.idEquipo
  const response = []
  db.query(
    "UPDATE registro_estructura SET apaterno=?,amaterno=?,nombres=?,calle=?,numero=?,colonia=?,cp=?,ciudad=?,clave_electoral=?,curp=?,fecha_nacimiento=?,seccion=?,id_Secc=?,circulo=?,no_celular=?,email=?,facebook=?,twitter=?,otra_red=?,id_equipo=?,lat=?,lng=? WHERE id=?;",
    [apaterno, amaterno, nombres, calle, numero, colonia, cp, ciudad, clave_elector, curp, fecha_nacimiento, seccion, id_Secc,nivel, no_celular, email, facebook, twitter, otra_red,equipo, lat,lng, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        //res.send(result)
        response.push(true);
        console.log(result)
      }
    }
  )
  if(response[0]==true){
    res.send("Editado");
  }else{
    res.send("No_editado");
  }



})
//--------------------------------- PROMOTORES -----------------------------------------------------------//
app.post('/insert-promotor', (req, res) => {
  //console.log(req.body)

  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const distrito_federal = req.body.distrito_federal
  const distrito_local = req.body.distrito_local
  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
  const contacto = req.body.contacto
  const no_celcontacto = req.body.no_celcontacto
  const lat = req.body.lat
  const lng = req.body.lng
  const lider = req.body.id_tipoLider
  const id_Secc = req.body.id_Secc
  const observaciones = req.body.observaciones
  const injerencias = req.body.injerencias
  const equipo = req.body.idEquipo


  const sql2 = "SELECT max(id) as id FROM img_ine"
  const sql3 = "SELECT max(id) as id FROM registro_promotores"
  const sqlInsert = "INSERT INTO registro_promotores (nombres,apaterno,amaterno,calle,numero,colonia,cp,ciudad,fecha_nacimiento,curp,clave_electoral,seccion,id_Secc,no_celular, email,facebook,twitter,otra_red,circulo,observaciones,lat,lng,img) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
  const secc_resp = "INSERT INTO secciones_responsabilidad_promotores (promotor_id,seccion_id) VALUES (?,?) ";
  const response = []
  db.query(sql2, (err, result) => {
    const id_image = result[0].id


    db.query(sqlInsert, [
      nombres, apaterno, amaterno, calle, numero, colonia, cp, ciudad, fecha_nacimiento, curp, clave_elector, seccion, id_Secc, no_celular, email, facebook, twitter, otra_red, nivel,
      observaciones, lat, lng, id_image], (err, result) => {
        if (err) {
          res.send(err);
        }
        else {
          response.push(true)

        }
      });

    db.query(sql3, (err, result) => {
      const id_p = result[0].id
      for (let i = 0; i < injerencias.length; i++) {
        db.query(secc_resp, [id_p, injerencias[i]], (err, result) => {
          if (err) {
            //console.log(err);
          }
          else {
            response.push(true);


          }
        })
      }

    });

  });



  if (response[0] == true && response[1] == true) {
    res.send("Agregado")
  }
  else {
    res.send("No Agregado")
  }


});

app.post('/promotores', (req, res) => {
  db.query("SELECT rp.id,CONCAT(rp.nombres,' ',rp.apaterno,' ',rp.amaterno) AS nombre,rp.no_celular,sd.secc,srp.promotor_id,srp.id AS idsr FROM  registro_promotores rp INNER JOIN secciones_responsabilidad_promotores srp ON rp.id=srp.promotor_id INNER JOIN secc_distrito sd ON srp.seccion_id=sd.id  ", (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      var empObj = JSON.parse(resultado);
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        //console.log(empObj)*/
      res.send(resultado)


    }
  })
})
app.delete('/deletePromotor/:id/:idsrp', (req, res) => {
  const id = req.params.id
  const idsrp = req.params.idsrp
  //console.log(req.params)
  db.query("DELETE FROM secciones_responsabilidad_promotores WHERE promotor_id=? AND id=?", [id, idsrp], (err, result) => {
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
      //console.log(result)
    }
  })
})
app.post('/promotores-view/:id', (req, res) => {
  const id = req.params.id
  db.query('SELECT  nombres,apaterno,amaterno,calle,numero,colonia,cp,ciudad,DATE_FORMAT(fecha_nacimiento, "%d/%m/%Y") AS fecha_nacimiento,curp,clave_electoral,seccion, no_celular, email,facebook, twitter, otra_red,id_Secc, circulo,observaciones,lat,lng,sd.df,sd.dl FROM registro_promotores INNER JOIN secc_distrito sd ON sd.id=registro_promotores.id_Secc WHERE registro_promotores.id=?', id, (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      var empObj = JSON.parse(resultado);
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        //console.log(empObj)*/
      res.send(resultado)


    }
  })
})
app.post('/responsabilidadPromotor/:id', (req, res) => {
  const id = req.params.id
  //console.log(id)
  const sqlInsert = "SELECT srp.seccion_id as value FROM secciones_responsabilidad_promotores  srp INNER JOIN secc_distrito sd ON srp.seccion_id=sd.id WHERE srp.promotor_id=?;";
  ////console.log(sqlInsert)
  db.query(sqlInsert, id, (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      //console.log(result)
      var empObj = JSON.parse(resultado);
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        //console.log(empObj)*/
      res.send(result)


    }
  });
});
app.post('/promotor/detalles/:id', (req, res) => {
  //console.log(req.body)

  const id = req.params.id;

  
 
 const q="SELECT *FROM registro_promotores rp INNER JOIN secc_distrito sd ON rp.id_Secc=sd.id WHERE rp.id=?;";
  db.query(
    q,id,
    
    (err, result) => {
      if (err) {
        //console.log(err);
      }
      else {
        res.send(result[0])
        console.log(result[0])
      }
    }
  )


})

app.post('/promotor-edit/:id', (req, res) => {
  console.log(req.body)

  const id = req.params.id;
  
  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const id_Secc=req.body.id_Secc

  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
 

  const lat = req.body.lat
  const lng= req.body.lng
  const equipo=req.body.idEquipo
  const response = []
  db.query(
    "UPDATE registro_promotores SET apaterno=?,amaterno=?,nombres=?,calle=?,numero=?,colonia=?,cp=?,ciudad=?,clave_electoral=?,curp=?,fecha_nacimiento=?,seccion=?,id_Secc=?,circulo=?,no_celular=?,email=?,facebook=?,twitter=?,otra_red=?,lat=?,lng=? WHERE id=?;",
    [apaterno, amaterno, nombres, calle, numero, colonia, cp, ciudad, clave_elector, curp, fecha_nacimiento, seccion, id_Secc,nivel, no_celular, email, facebook, twitter, otra_red, lat,lng, id],
    (err, result) => {
      if (err) {
        console.log(err);
        response.push(false);
      }
      else {
        //res.send(result)
        response.push(true);
        console.log(result)
      }
    }
  )
  if(response[0]==true){
    res.send("Editado");
  }else{
    res.send("No_editado");
  }



})


///------------------------ PROMOVIDOS ----------------------------
app.post('/insert-promovido', (req, res) => {
  //console.log(req.body)

  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const distrito_federal = req.body.distrito_federal
  const distrito_local = req.body.distrito_local
  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
  const contacto = req.body.contacto
  const no_celcontacto = req.body.no_celcontacto
  const lat = req.body.lat
  const lng = req.body.lng
  const lider = req.body.id_tipoLider
  const id_Secc = req.body.id_Secc
  const observaciones = req.body.observaciones
  const injerencia = req.body.injerencia
  const promotor = req.body.id_promotor


  const sql2 = "SELECT max(id) as id FROM img_ine"
  const sql3 = "SELECT max(id) as id FROM registro_promotores"
  const sqlInsert = "INSERT INTO registro_promovidos (nombres,apaterno,amaterno,calle,numero,colonia,cp,ciudad,fecha_nacimiento,curp,clave_electoral,seccion,id_Secc,no_celular, email,facebook,twitter,otra_red,circulo,observaciones,lat,lng,img,id_promotor) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
  const response = []
  const exist="SELECT * FROM registro_promovidos WHERE clave_electoral='"+clave_elector+"';";
  //console.log(exist);
  db.query(exist, (err, result) => {
    if(err){
      console.log(err);
    }else{
      if(result.length>0){
        console.log("existe");
        response.push(false);
      }
      else{
        console.log("no existe");
        db.query(sql2, (err, res) => {
          const id_image = res[0].id
      
      
          db.query(sqlInsert, [
            nombres, apaterno, amaterno, calle, numero, colonia, cp, ciudad, fecha_nacimiento, curp, clave_elector, seccion, id_Secc, no_celular, email, facebook, twitter, otra_red, nivel,
            observaciones, lat, lng, id_image, promotor], (err, re) => {
              if (err) {
                //console.log(err);
              }
              else {
                response.push(true)
      
              }
            });
      
      
      
        });
      
      }
    }
  });
  /*db.query(sql2, (err, result) => {
    const id_image = result[0].id


    db.query(sqlInsert, [
      nombres, apaterno, amaterno, calle, numero, colonia, cp, ciudad, fecha_nacimiento, curp, clave_elector, seccion, id_Secc, no_celular, email, facebook, twitter, otra_red, nivel,
      observaciones, lat, lng, id_image, promotor], (err, result) => {
        if (err) {
          //console.log(err);
        }
        else {
          response.push(true)

        }
      });



  });

*/

  if (response[0] == true) {
    res.send("Agregado")
  }
  else {
    res.send("No Agregado")
  }


});
app.post('/promovidos', (req, res) => {
  db.query("SELECT a.id,CONCAT(a.nombres,' ',a.apaterno,' ',a.amaterno) AS nombre,a.no_celular,a.seccion,CONCAT(b.nombres,' ',b.apaterno,' ',b.amaterno) AS nombre2 FROM registro_promovidos a INNER JOIN registro_promotores b ON a.id_promotor= b.id ;", (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      var empObj = JSON.parse(resultado);
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        //console.log(empObj)*/
      res.send(resultado)


    }
  })
})
app.post('/promovidos-view/:id', (req, res) => {
  const id = req.params.id
  db.query('SELECT  r.nombres,r.apaterno,r.amaterno,r.calle,r.numero,r.colonia,r.cp,r.ciudad,DATE_FORMAT(r.fecha_nacimiento, "%d/%m/%Y") AS fecha_nacimiento,r.curp,r.clave_electoral,r.seccion, r.no_celular, r.email,r.facebook, r.twitter, r.otra_red,r.id_Secc,r.circulo,r.observaciones,r.lat,r.lng,sd.df,sd.dl,rp.id AS promotor FROM registro_promovidos r INNER JOIN secc_distrito sd ON sd.id=r.id_Secc INNER JOIN registro_promotores rp ON rp.id=r.id_promotor WHERE r.id=?', id, (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      var empObj = JSON.parse(resultado);
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        //console.log(empObj)*/
      //console.log(resultado)
      res.send(resultado)


    }
  })
})
app.post('/promovidos/detalles/:id', (req, res) => {
  //console.log(req.body)

  const id = req.params.id;

  
 
 const q="SELECT *FROM registro_promovidos rp INNER JOIN secc_distrito sd ON rp.id_Secc=sd.id WHERE rp.id=?;";
  db.query(
    q,id,
    
    (err, result) => {
      if (err) {
        //console.log(err);
      }
      else {
        res.send(result[0])
        console.log(result[0])
      }
    }
  )


})
app.post('/promovidos/edit/:id', (req, res) => {
  console.log(req.body)

  const id = req.params.id;
  
  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const id_Secc=req.body.id_Secc

  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
 

  const lat = req.body.lat
  const lng= req.body.lng
  const promotores=req.body.id_promotor
  const response = []
  db.query(
    "UPDATE registro_promovidos SET apaterno=?,amaterno=?,nombres=?,calle=?,numero=?,colonia=?,cp=?,ciudad=?,clave_electoral=?,curp=?,fecha_nacimiento=?,seccion=?,id_Secc=?,circulo=?,no_celular=?,email=?,facebook=?,twitter=?,otra_red=?,id_promotor=?,lat=?,lng=? WHERE id=?;",
    [apaterno, amaterno, nombres, calle, numero, colonia, cp, ciudad, clave_elector, curp, fecha_nacimiento, seccion, id_Secc,nivel, no_celular, email, facebook, twitter, otra_red,promotores, lat,lng, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        //res.send(result)
        response.push(true);
        console.log(result)
      }
    }
  )
  if(response[0]==true){
    res.send("Editado");
  }else{
    res.send("No_editado");
  }



})

///------------------------ REPRESENTANTES ----------------------------

app.post('/api/insert-representantes', (req, res) => {
  console.log(req.body)

  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const distrito_federal = req.body.distrito_federal
  const distrito_local = req.body.distrito_local
  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
  const contacto = req.body.contacto
  const no_celcontacto = req.body.no_celcontacto
  const lat = req.body.lat
  const lng = req.body.lng
  const repr = req.body.tiporep
  const id_Secc = req.body.id_Secc
  const observaciones = req.body.observaciones
  const menu1 = req.body.menu1
  const menu2C = req.body.menu2C
  const menu2SMR = req.body.menu2SMR
  const menu2E = req.body.menu2E
  const menu3 = req.body.menu3
  const menu4 = req.body.menu4
  const sqlInsert = "INSERT INTO registro_representantes_casilla (nombres,apaterno,amaterno,calle,numero,colonia,cp,ciudad,fecha_nacimiento,curp,clave_electoral,seccion,id_Secc,no_celular, email,facebook,twitter,otra_red,circulo,contacto,no_celcontacto,observaciones,lat,lng,img,tipo_casilla,id_casilla) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
  const sql2 = "SELECT max(id) as id FROM img_ine"
  if (menu1 == "B") {
    db.query(sql2, (err, result) => {
      const id_image = result[0].id


      db.query(sqlInsert, [
        nombres, apaterno, amaterno, calle, numero, colonia, cp, ciudad, fecha_nacimiento, curp, clave_elector, seccion, id_Secc, no_celular, email, facebook, twitter, otra_red, nivel, contacto, no_celcontacto,
        observaciones, lat, lng, id_image, menu1, "N/A"], (err, result) => {
          if (err) {
            console.log(err);

          }
          else {

            res.send("Agregado")

          }
        });
    })
  }

  if (menu1 == "C") {
    db.query(sql2, (err, result) => {
      const id_image = result[0].id
      const search = menu1 + menu2C;
      const sqlcas = "SELECT * FROM casillas_cont WHERE nomenclatura='" + search + "';"
      console.log("consulta"+sqlcas);

      db.query(sqlcas, (err, result) => {
        const id_cas = result[0].id
        db.query(sqlInsert, [
          nombres, apaterno, amaterno, calle, numero, colonia, cp, ciudad, fecha_nacimiento, curp, clave_elector, seccion, id_Secc, no_celular, email, facebook, twitter, otra_red, nivel, contacto, no_celcontacto,
          observaciones, lat, lng, id_image, menu1, id_cas], (err, result) => {
            if (err) {
              console.log(err);

            }
            else {
              console.log(result);
              res.send("Agregado");

            }
          });
      })
   } )
   
}
if (menu1 == "SMR") {
  db.query(sql2, (err, result) => {
    const id_image = result[0].id
    const search = menu1 + menu2SMR;
    const sqlcas = "SELECT * FROM casillas_esp WHERE nomenclatura='" + search + "';"
    console.log("consulta"+sqlcas);

    db.query(sqlcas, (err, result) => {
      const id_cas = result[0].id
      db.query(sqlInsert, [
        nombres, apaterno, amaterno, calle, numero, colonia, cp, ciudad, fecha_nacimiento, curp, clave_elector, seccion, id_Secc, no_celular, email, facebook, twitter, otra_red, nivel, contacto, no_celcontacto,
        observaciones, lat, lng, id_image, menu1, id_cas], (err, result) => {
          if (err) {
            console.log(err);

          }
          else {
            console.log(result);
            res.send("Agregado");

          }
        });
    })
 } )
 
}
if (menu1 == "E") {
  db.query(sql2, (err, result) => {
    const id_image = result[0].id
    const search = menu1 + menu2E;
    const sqlcas = "SELECT * FROM casillas_ext WHERE nomenclatura='" + search + "';"
    console.log("consulta"+sqlcas);

    db.query(sqlcas, (err, result) => {
      const id_cas = result[0].id
      db.query(sqlInsert, [
        nombres, apaterno, amaterno, calle, numero, colonia, cp, ciudad, fecha_nacimiento, curp, clave_elector, seccion, id_Secc, no_celular, email, facebook, twitter, otra_red, nivel, contacto, no_celcontacto,
        observaciones, lat, lng, id_image, menu1, id_cas], (err, result) => {
          if (err) {
            console.log(err);

          }
          else {
            console.log(result);
            res.send("Agregado");

          }
        });
    })
 } )
 
}
if (menu1=="EC") {
  db.query(sql2, (err, result) => {
    const id_image = result[0].id
    const search = "E"+ menu2E+menu3+menu4;
    const sqlcas = "SELECT * FROM casillas_extcont WHERE nomenclatura='" + search + "';"
    console.log("consulta"+sqlcas);

    db.query(sqlcas, (err, result) => {
      const id_cas = result[0].id
      db.query(sqlInsert, [
        nombres, apaterno, amaterno, calle, numero, colonia, cp, ciudad, fecha_nacimiento, curp, clave_elector, seccion, id_Secc, no_celular, email, facebook, twitter, otra_red, nivel, contacto, no_celcontacto,
        observaciones, lat, lng, id_image, "EC", id_cas], (err, result) => {
          if (err) {
            console.log(err);

          }
          else {
            console.log(result);
            res.send("Agregado");

          }
        });
    })
 } )
 
    
  }
}


  /*
    const sql2 = "SELECT max(id) as id FROM img_ine"
    const sql3 = "SELECT max(id) as id FROM registro_promotores"
    const sqlInsert = "INSERT INTO registro_promovidos (nombres,apaterno,amaterno,calle,numero,colonia,cp,ciudad,fecha_nacimiento,curp,clave_electoral,seccion,id_Secc,no_celular, email,facebook,twitter,otra_red,circulo,observaciones,lat,lng,img,id_promotor) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    const response = []
    db.query(sql2, (err, result) => {
      const id_image = result[0].id
  
  
      db.query(sqlInsert, [
        nombres, apaterno, amaterno, calle, numero, colonia, cp, ciudad, fecha_nacimiento, curp, clave_elector, seccion, id_Secc, no_celular, email, facebook, twitter, otra_red, nivel,
        observaciones, lat, lng, id_image,promotor], (err, result) => {
          if (err) {
            //console.log(err);
          }
          else {
            response.push(true)
  
          }
        });
    })
    */
);
app.post('/api/insert-representantesg', (req, res) => {
  console.log(req.body)

  const apaterno = req.body.apaterno
  const amaterno = req.body.amaterno
  const nombres = req.body.nombres
  const calle = req.body.calle
  const numero = req.body.numero
  const colonia = req.body.colonia
  const cp = req.body.cp
  const ciudad = req.body.ciudad
  const clave_elector = req.body.clave_elector
  const curp = req.body.curp
  const fecha_nacimiento = req.body.fecha_nacimiento
  const seccion = req.body.seccion
  const distrito_federal = req.body.distrito_federal
  const distrito_local = req.body.distrito_local
  const nivel = req.body.nivel
  const no_celular = req.body.no_celular
  const email = req.body.email
  const facebook = req.body.facebook
  const twitter = req.body.twitter
  const otra_red = req.body.otra_red
  const contacto = req.body.contacto
  const no_celcontacto = req.body.no_celcontacto
  const lat = req.body.lat
  const lng = req.body.lng
  const repr = req.body.tiporep
  const consejo=req.body.consejo
  const ruta=req.body.ruta
  const injerencias=req.body.injerencias
  const id_Secc = req.body.id_Secc
  const observaciones = req.body.observaciones

  const sqlInsert = "INSERT INTO registro_representantes_casilla_gral (nombres,apaterno,amaterno,calle,numero,colonia,cp,ciudad,fecha_nacimiento,curp,clave_electoral,seccion,id_Secc,no_celular, email,facebook,twitter,otra_red,circulo,contacto,no_celcontacto,observaciones,lat,lng,img,ruta,consejo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
  const sql2 = "SELECT max(id) as id FROM img_ine"
  const sql3 = "SELECT max(id) as id FROM registro_representantes_casilla_gral;"
  const secc_resp = "INSERT INTO secciones_responsabilidad_representantes (representante_id,seccion_id) VALUES (?,?) ";
  const response = []
  db.query(sql2, (err, result) => {
    const id_image = result[0].id


    db.query(sqlInsert, [
      nombres, apaterno, amaterno, calle, numero, colonia, cp, ciudad, fecha_nacimiento, curp, clave_elector, seccion, id_Secc, no_celular, email, facebook, twitter, otra_red, nivel, contacto, no_celcontacto,
      observaciones, lat, lng, id_image, ruta, consejo], (err, result) => {
        if (err) {
          console.log(err);

        }
        else {

          response.push("Agregado")

        }
      });
    db.query(sql3, (err, result) => {
      const id_p = result[0].id
      for (let i = 0; i < injerencias.length; i++) {
        db.query(secc_resp, [id_p, injerencias[i]], (err, result) => {
          if (err) {
            //console.log(err);
          }
          else {
            response.push(true);


          }
        })
      }

    });

  });



  if (response[0] == true && response[1] == true) {
    res.send("Agregado")
  }
  else {
    res.send("No Agregado")
  }



}


);
// ------- representantes generales ----------

app.post('/representantes', (req, res) => {
  db.query('SELECT rc.id,CONCAT(rc.nombres," ",rc.apaterno," ",rc.amaterno) AS nombre,rc.no_celular,sd.secc,srp.id AS idsr FROM registro_representantes_casilla_gral rc INNER JOIN secciones_responsabilidad_representantes srp ON rc.id=srp.representante_id INNER JOIN secc_distrito sd ON srp.seccion_id=sd.id;', (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      var empObj = JSON.parse(resultado);
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        //console.log(empObj)*/
      res.send(resultado)


    }
  })
})
app.post('/representantesg/detalles/:id', (req, res) => {
  //console.log(req.body)

  const id = req.params.id;

  
 
 const q="SELECT *FROM registro_representantes_casilla_gral rp INNER JOIN secc_distrito sd ON rp.id_Secc=sd.id WHERE rp.id=?;";
  db.query(
    q,id,
    
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result[0])
        console.log(result[0])
      }
    }
  )


})

// ------- representantes casilla ----------
app.post('/representantes2', (req, res) => {
  db.query('SELECT rc.id,CONCAT(rc.nombres," ",rc.apaterno," ",rc.amaterno) AS nombre,rc.no_celular,ca.nombre AS tipocasilla FROM registro_representantes_casilla rc INNER JOIN cat_casilla ca ON rc.tipo_casilla=ca.sigla;', (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      acciones = '<Link className="view" to={"/apoyos/view-apoyo/" + val.id} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/" + val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(val.id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link>';
      var resultado = JSON.stringify(result);
      var empObj = JSON.parse(resultado);
      /*var id="";
      empObj.forEach((item) => {
          Object.entries(item).forEach(([key, val]) => {
              if(key=="id"){
                  id=JSON.stringify(val);
                  //console.log(`key-${key}-val-${JSON.stringify(val)}`)}
            
          });
          Object.assign(item,{acciones:'<Link className="view" to="/apoyos/view-apoyo/'+id+'" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link><Link className="edit" to={"/apoyos/edit-apoyo/"'+ id+'} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link><Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId('+id+') }} title="Delete"><i className="material-icons">&#xE872;</i></Link>'})
        });
        //console.log(empObj)*/
      res.send(resultado)


    }
  })
})

app.delete('/deleteRep1/:id/:idsrp', (req, res) => {
  const id = req.params.id
  const idsrp = req.params.idsrp
  //console.log(req.params)
  db.query("DELETE FROM secciones_responsabilidad_representantes WHERE representante_id=? AND id=?", [id, idsrp], (err, result) => {
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
      //console.log(result)
    }
  })
})

app.delete('/deleteR2/:id', (req, res) => {
  const id = req.params.id
  db.query("DELETE FROM registro_representantes_casilla WHERE id=?", id, (err, result) => {
    if (err) {
      //console.log(err)
      res.send(err);
    }
    else {
      //console.log(result);
      res.send({ status: 404, msg: "No user found" });
      //res.status().send(200); 
    }
  })
})

app.post('/ayuntamiento-df/', (req, res) => {
  const sqlInsert = 'SELECT dl, COUNT(*) FROM ayuntamiento WHERE dl != ""  GROUP BY dl;';
  //console.log(sqlInsert);
  db.query(sqlInsert, (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      res.send(JSON.stringify(result))
    }
  });
})

app.post('/ayuntamiento-secc/', (req, res) => {
  const sqlInsert = 'SELECT secc, COUNT(*) FROM ayuntamiento WHERE secc != ""  GROUP BY secc;';
  //console.log(sqlInsert);
  db.query(sqlInsert, (err, result) => {
    if (err) {
      //console.log(err)
    }
    else {
      res.send(JSON.stringify(result))
    }
  });
})

app.post('/ress-view/', (req, res) => {
  console.log(req.body)

  if( req.body.anio=="2015"){
    const sqlInsert = 'SELECT cas,pan15,pri15,prd15,pt15,pvem15,morena15,pes15,ln15,part15,mc15 FROM ayuntamiento WHERE secc=?;';
    //console.log(sqlInsert);
    db.query(sqlInsert,[req.body.seccion,req.body.dl], (err, result) => {
      if (err) {
        //console.log(err)
      }
      else {
        //console.log(result)
        res.send(result[0])
      }
    });
  }

  if( req.body.anio=="2018"){
    const sqlInsert = 'SELECT cas,pan18,pri18,prd18,pt18,pvem18,morena18,pes18,ln18,part18,mc18 FROM ayuntamiento WHERE secc=?;';
    //console.log(sqlInsert);
    db.query(sqlInsert,[req.body.seccion,req.body.dl], (err, result) => {
      if (err) {
        //console.log(err)
      }
      else {
        //console.log(result)
        res.send(result[0])
      }
    });
  }
  if( req.body.anio=="2021"){
    const sqlInsert = 'SELECT cas,pan21,pri21,prd21,pt21,pvem21,morena21,pes21,ln21,part21,mc21 FROM ayuntamiento WHERE secc=?;';
    //console.log(sqlInsert);
    db.query(sqlInsert,[req.body.seccion,req.body.dl], (err, result) => {
      if (err) {
        //console.log(err)
      }
      else {
        console.log(result)
        res.send(result[0])
      }
    });
  }
 
})


