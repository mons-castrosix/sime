import React, { useState } from 'react';
import apoyo from './apoyos.png'
import Axios from 'axios';
import './apoyos.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

function Apoyos() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [aPaterno,setApaterno]= useState('');
  const [aMaterno,setAmaterno]=useState('');
  const [nombres,setNombres]=useState('');
  const [calle,setCalle]=useState('');
  const [numero,setNumero]=useState('');
  const [colonia,setColonia]=useState('');
  const [cp,setCp]=useState('');
  const [ciudad,setCiudad]=useState('');
  const [claveElectoral,setClave]=useState('');
  const [curp,setCurp]= useState('');
  const [fecha,setFecha]=useState('');
  const [seccion,setSeccion]=useState('');
  const [dfederal,setDfederal]=useState(0);
  const [dLocal,setDlocal]=useState(0);
  const [nivel,setNivel]=useState(0);
  const [celular, setCelular]=useState('');
  const [email, setEmail]=useState('');
  const [facebook, setFacebook]=useState('');
  const [twitter, setTwitter]=useState('');
  const [otra, setOtra]=useState('');
  const [descrApoyo, setDescapoyo]=useState('');
  const [tipoApoyo, setTipoapoyo]=useState('');
  const [monto, setMonto]=useState(0);
  const [alcance, setAlcance]=useState('');
  const [contacto, setContacto]=useState('');
  const [celContacto, setCelcontacto]=useState('');
  
  const [selectedImage, setSelectedImage] = useState();
 
  const navigate=useNavigate();
  
  const atras = () =>{ 
    let path = '/'; 
    navigate(path);
  }
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile1 = async (e) => {
    const formData = new FormData();
    console.log(fileName)
    console.log(file)
    formData.append("file", file);
    formData.append("fileName", fileName);
    //console.log(formData)
    
    try {
      const res = await Axios.post(
        //"http://54.219.124.66:3001/uploadD",
        "http://localhost:3001/uploadD",
        formData
      );
      
      
      document.getElementById("amaterno").setAttribute('value',res.data.amaterno)
      document.getElementById("apaterno").setAttribute('value',res.data.apaterno)
      document.getElementById("nombre").setAttribute('value',res.data.nombres)
      document.getElementById("calle").setAttribute('value',res.data.calle)
      document.getElementById("colonia").setAttribute('value',res.data.colonia)
      document.getElementById("cpostal").setAttribute('value',res.data.cp)
      document.getElementById("numero").setAttribute('value',res.data.numero)
      document.getElementById("curp").setAttribute('value',res.data.curp)
      var fecha= res.data.fecha_nacimiento
      fecha = fecha.split("/").reverse().join("-");
      document.getElementById("fnacimiento").setAttribute('value',fecha)
      document.getElementById("secc").setAttribute('value',res.data.seccion)
      document.getElementById("celectoral").setAttribute('value',res.data.c_elector)
      document.getElementById("ciudad").setAttribute('value',res.data.ciudad)
      setApaterno(document.getElementById("apaterno").value)
      setAmaterno(document.getElementById("amaterno").value)
      setNombres(document.getElementById("nombre").value)
      setCalle(document.getElementById("calle").value)
      setNumero(document.getElementById("numero").value)
      setColonia(document.getElementById("colonia").value)
      setCp(document.getElementById("cpostal").value)
      setCiudad(document.getElementById("ciudad").value)
      setClave(document.getElementById("celectoral").value)
      setCurp(document.getElementById("curp").value)
      setFecha(document.getElementById("fnacimiento").value)
      setSeccion(document.getElementById("secc").value)
      setDfederal(document.getElementById("df").value)
      setDlocal(document.getElementById("dl").value)



    } catch (ex) {
      //console.log(ex);
    }
  };
  

  const submitReview = () =>{
    

    Axios.post(//"http://54.219.124.66:3001/api/insert",
    "http://localhost:3001/api/insert",
    {
      
    apaterno:aPaterno,amaterno:aMaterno,nombres:nombres,calle:calle,numero:numero,colonia:colonia,cp:cp,
    ciudad:ciudad,clave_elector:claveElectoral,curp:curp,fecha_nacimiento:fecha,seccion:seccion,distrito_federal:document.getElementById("df").value,
    distrito_local:document.getElementById("dl").value,nivel:nivel,no_celular:celular,email:email,facebook:facebook,twitter:twitter,
    otra_red:otra,descripcion_apoyo:descrApoyo,apoyo_tipo:tipoApoyo,monto_apoyo:monto,alcance_apoyo:alcance,contacto:contacto,
    no_celcontacto:celContacto
    }).then(() => {
      console.log("succes")
      alert("AGREGADO")
      navigate('/apoyos')

    });
    /*console.log(aPaterno + aMaterno + nombres + calle + numero + colonia + cp + ciudad 
      + claveElectoral + curp + fecha + seccion + dfederal + dLocal + nivel
      + celular + email + facebook + twitter + otra + descrApoyo + tipoApoyo
      + monto + alcance + contacto + celContacto+camera_ine)*/
  }
  const submitSeccion = () =>{
    
    
    Axios.post("http://localhost:3001/api/distritos"
    /*"http://54.219.124.66:3001/api/distritos"*/,{
    seccion:document.getElementById("secc").value
    }).then((res) => {

      console.log(res.data.df)
      document.getElementById("df").value=res.data.df
      document.getElementById("dl").value=res.data.dl
      console.log(seccion)
      
    });
    
  }
 

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setFile();
  };

  return (
    <div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous"/>
       <div className="container-xl px-4 mt-4">
   
    <nav className="nav nav-borders">
        
    </nav>
    
    <div className="row">
        <div className="col-xl-4">
            
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">INE</div>
                <div className="card-body text-center">
                    
                <label htmlFor="ine">Cargar INE</label>
                        <input 
                        type="file" 
                        className="form-control" 
                        id="ine" 
                        capture='enviroment'
                        name="ine" 
                        accept='image/*'
                        encType="multipart/form-data"
                        
                        required
                        onChange={saveFile} /> <br></br>
                        <button  onClick={uploadFile1}  className="btn btn-dark btn-md cargar" type="submit">Cargar</button>

                        {file && (
          <div className='preview' >
            <img
              src={URL.createObjectURL(file)}
              alt="Thumb"
            />
            <button className='delete' onClick={removeSelectedImage} >
              X
            </button>
            
          </div>
          )}  
                </div>
            </div>
        </div>
        <div className="col-xl-8">
            
            <div className="card mb-4">
                <div className="card-header">Detalles</div>
                <div className="card-body">
                   
                        
                        <div className="mb-3">
                        <label htmlFor="nombre">Nombre(s)</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="nombre" 
                        name="nombre" 
                        placeholder="Nombre (s)" required 
                        onChange={(event) =>{setNombres(event.target.value)}}/>
                          
                        </div>
                       
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                            <label htmlFor="apaterno">Apellido Paterno</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="apaterno" 
                            name="apaterno" 
                            placeholder="Apellido Paterno" required 
                            onChange={(event) =>{setApaterno(event.target.value)}} />
         
                            </div>
                            
                            <div className="col-md-6">
                            <label htmlFor="amaterno">Apellido Materno</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="amaterno" 
                            name="amaterno" 
                            placeholder="Apellido Materno" required 
                            onChange={(event) =>{setAmaterno(event.target.value)}}/>
                            </div>
                        </div>
                       
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                            <label htmlFor="calle">Calle</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="calle" 
                            name="calle" 
                            placeholder="Calle" required 
                            onChange={(event) =>{setCalle(event.target.value)}}/>
                            </div>
                            
                            <div className="col-md-6">
                            <label htmlFor="numero">No.</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="numero" 
                            name="numero" 
                            placeholder="Número" required 
                            onChange ={(event) =>{setNumero(event.target.value)}} />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                            <label htmlFor="colonia">Colonia</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="colonia" 
                            name="colonia" 
                            placeholder="Colonia" required 
                            onChange={(event) =>{setColonia(event.target.value)}} />
                            </div>
                            
                            <div className="col-md-6">
                            <label htmlFor="cpostal">CP</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="cpostal" 
                            name="cpostal" 
                            placeholder="Código Postal" required 
                            onChange={(event) =>{setCp(event.target.value)}} />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                            <label htmlFor="colonia">Ciudad</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="ciudad" 
                            name="ciudad" 
                            placeholder="Ciudad" required 
                            onChange={(event) =>{setCiudad(event.target.value)}} />
                            </div>
                            
                            <div className="col-md-6">
                            <label htmlFor="celectoral">Clave Electoral</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="celectoral" 
                            name="celectoral" 
                            placeholder="Clave electoral"  required 
                            onChange={(event) =>{setClave(event.target.value)}} />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                            <label htmlFor="curp">CURP</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="curp" 
                            name="curp" 
                            placeholder="CURP" required 
                            onChange={(event) =>{setCurp(event.target.value)}} />
                            </div>
                            
                            <div className="col-md-6">
                            <label htmlFor="fnacimiento">Fecha de Nacimiento</label>
                            <input 
                            type="date" 
                            className="form-control" 
                            id="fnacimiento" 
                            name="fnacimiento" 
                            placeholder="Fecha de Nacimiento" required 
                            onChange={(event) =>{setFecha(event.target.value)}}/>
                            </div>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="secc">Sección</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="secc" 
                        name="secc" 
                        placeholder="Sección" required 
                        onChange={(event) =>{setSeccion(event.target.value)}}/>
                        </div>
                       
                        
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-3">
                            <label htmlFor="df">Distrito Federal</label>
                            <input 
                            type="number" 
                            className="form-control" 
                            id="df" 
                            name="df" required 
                            onChange={(event) =>{setDfederal(event.target.value)}} />
                            </div>
                            
                            <div className="col-md-3">
                            <label htmlFor="dl">Distrito Local</label>
                            <input 
                            type="number" 
                            className="form-control" 
                            id="dl" 
                            name="dl" required 
                            onChange={(event) =>{setDlocal(event.target.value)}} />
                            </div>
                            <div className="col-md-3">
                            <button onClick={submitSeccion}  className="btn btn-primary btn-sm distritos" type="submit">Asignar Distritos</button>
                            </div>
                            <div className="col-md-3">
                                <label className="small mb-1" htmlFor="nivel">Nivel</label>
                                <select 
                                className="form-control"  
                                id="nivel" 
                                
                                name="nivel" required 
                                onChange={(event) =>{setNivel(event.target.value)}}
                                >
                                    <option value="">Elije un nivel</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                  
                                  </select>
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                            <label htmlFor="cel">No. Celular</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="cel" 
                            name="cel" required 
                            onChange={(event) =>{setCelular(event.target.value)}} />
                            </div>
                            
                            <div className="col-md-6">
                            <label htmlFor="email">Email</label>
                            <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email" 
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required 
                            onChange={(event) =>{setEmail(event.target.value)}}/>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                            <label htmlFor="fb">Facebook</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="fb" 
                            name="fb" 
                            placeholder=""  required 
                            onChange={(event) =>{setFacebook(event.target.value)}}/>
                            </div>
                            
                            <div className="col-md-6">
                            <label htmlFor="tw">Twitter</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="tw" 
                            name="tw" 
                            placeholder=""  required 
                            onChange={(event) =>{setTwitter(event.target.value)}} />
                            </div>
                        </div>

                        <div className="mb-3">
                        <label htmlFor="otrared">Otra red social</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="otrared" 
                        name="otrared" 
                        placeholder=""  required 
                        onChange={(event) =>{setOtra(event.target.value)}}/>
                        </div>
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                            <label htmlFor="otrared">Contacto</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="contacto" 
                            name="contacto" 
                            placeholder=""  required 
                            onChange={(event) =>{setContacto(event.target.value)}} />
                            </div>
                            
                            <div className="col-md-6">
                            <label htmlFor="otrared">No. Celular de Contacto</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="nocontacto" 
                            name="nocontacto" 
                            placeholder=""  required 
                            onChange={(event) =>{setCelcontacto(event.target.value)}} />
                            </div>
                        </div>
                        <hr></hr>
                        <div className="mb-3">
                        <label htmlFor="tw">Descripción de Apoyo</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="descapoyo" 
                        name="descapoyo" 
                        placeholder=""  required 
                        onChange={(event) =>{setDescapoyo(event.target.value)}} />
                        </div>

                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-4">
                                <label className="small mb-1" htmlFor="tipoapoyo">Tipo de Apoyo</label>
                                <select 
                                  className="form-control mr-1" 
                                  id="tipoapoyo" 
                                  name="tipoapoyo" required 
                                  onChange={(event) =>{setTipoapoyo(event.target.value)}}
                                  >
                                      <option value="" >Selecciona alguna opcion</option>
                                      <option value="Económico">Económico</option>
                                      <option value="Especia">Especie</option>
                                      <option value="Con terceros">Con terceros</option>
                                    
                                  </select>
                            </div>
                            
                            <div className="col-md-4">
                            <label htmlFor="tw">Monto de Apoyo</label>
                            <input 
                            type="number" 
                            className="form-control" 
                            id="montoapoyo" 
                            name="montoapoyo" 
                            placeholder=""  required 
                            onChange={(event) =>{setMonto(event.target.value)}} />
                            </div>
                            <div className="col-md-4">
                                <label className="small mb-1" htmlFor="alcanceapoyo">Alcance de Apoyo</label>
                                <select 
                                className="form-control mr-1" 
                                id="alcanceapoyo" 
                                name="alcanceapoyo" required 
                                onChange={(event) =>{setAlcance(event.target.value)}}
                                >
                                    <option value="">Selecciona alguna opcion</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Familiar">Familiar</option>
                                    <option value="Comunitario">Comunitario</option>
                                  
                                </select>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-4">
                               
                            </div>
                            
                            <div className="col-md-4">
                            <button className="btn btn-primary" onClick={atras} type="button">Regresar</button>
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-primary" onClick={submitReview} type="button">Guardar cambios</button>
                            </div>
                        </div>
                        
                        
                        
                        
                    
                </div>
            </div>
        </div>
    </div>
</div>

        

    </div>
    /*
    <div className="divmap">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous"/>
    <div className="text-center pt-5">
    <img src={apoyo} alt="network-logo" width="72" height="72" />
    <h2>Registro Apoyos</h2>
    <p>
     
    </p>
  </div>
  

  <div className="card pt-2 pl-4 pr-4">
    <div className="card-body">
     
      <div className="">
        <div className="row px-1">

          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            
              <label htmlFor="ine">Cargar INE</label>
                        <input 
                        type="file" 
                        className="form-control" 
                        id="ine" 
                        capture='enviroment'
                        name="ine" 
                        accept='image/*'
                        encType="multipart/form-data"
                        
                        required
                        onChange={saveFile} /> <br></br>
                        <button  onClick={uploadFile1}  className="btn btn-dark btn-md cargar" type="submit">Cargar</button>
           
           
            
         
          
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
          
          {file && (
          <div className='preview' >
            <img
              src={URL.createObjectURL(file)}
              
              alt="Thumb"
            />
            <button className='delete' onClick={removeSelectedImage} >
              Ocultar Imagen
            </button>
          </div>
          )}

          
          </div>

        </div>
      </div>
      <hr></hr>
      <div className="">
        <div className="row">
          <div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <label htmlFor="apaterno">Apellido Paterno</label>
          <input 
          type="text" 
          className="form-control" 
          id="apaterno" 
          name="apaterno" 
          placeholder="Apellido Paterno" required 
          onChange={(event) =>{setApaterno(event.target.value)}} />
          </div>
          
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
          <label htmlFor="amaterno">Apellido Materno</label>
          <input 
          type="text" 
          className="form-control" 
          id="amaterno" 
          name="amaterno" 
          placeholder="Apellido Materno" required 
          onChange={(event) =>{setAmaterno(event.target.value)}}/>
          </div>
          
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
          <label htmlFor="nombre">Nombre(s)</label>
          <input 
          type="text" 
          className="form-control" 
          id="nombre" 
          name="nombre" 
          placeholder="Nombre (s)" required 
          onChange={(event) =>{setNombres(event.target.value)}}/>
          </div>
        </div>
      </div>
      <div className="">
        <div className="row px-1">
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
          <label htmlFor="calle">Calle</label>
          <input 
          type="text" 
          className="form-control" 
          id="calle" 
          name="calle" 
          placeholder="Calle" required 
          onChange={(event) =>{setCalle(event.target.value)}}/>
          </div>
          
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
          <label htmlFor="numero">No.</label>
          <input 
          type="text" 
          className="form-control" 
          id="numero" 
          name="numero" 
          placeholder="Número" required 
          onChange ={(event) =>{setNumero(event.target.value)}} />
          </div>
          
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
          <label htmlFor="colonia">Colonia</label>
          <input 
          type="text" 
          className="form-control" 
          id="colonia" 
          name="colonia" 
          placeholder="Colonia" required 
          onChange={(event) =>{setColonia(event.target.value)}} />
          </div>
        </div>
      </div>
      <div className="">
        <div className="row px-1">
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
          <label htmlFor="cpostal">CP</label>
          <input 
          type="text" 
          className="form-control" 
          id="cpostal" 
          name="cpostal" 
          placeholder="Código Postal" required 
          onChange={(event) =>{setCp(event.target.value)}} />
          </div>
          
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
          <label htmlFor="colonia">Ciudad</label>
          <input 
          type="text" 
          className="form-control" 
          id="ciudad" 
          name="ciudad" 
          placeholder="Ciudad" required 
          onChange={(event) =>{setCiudad(event.target.value)}} />
          </div>
          
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
          <label htmlFor="celectoral">Clave Electoral</label>
          <input 
          type="text" 
          className="form-control" 
          id="celectoral" 
          name="celectoral" 
          placeholder="Clave electoral"  required 
          onChange={(event) =>{setClave(event.target.value)}} />
          </div>
        </div>
      </div>
      
        
      <div className="">
        <div className="row px-1">
          <div className="form-group col-lg-4 col-md-4 col-sm-4 col-6">
          <label htmlFor="curp">CURP</label>
          <input 
          type="text" 
          className="form-control" 
          id="curp" 
          name="curp" 
          placeholder="CURP" required 
          onChange={(event) =>{setCurp(event.target.value)}} />
          </div>
          
          <div className="form-group col-lg-4 col-md-4 col-sm-4 col-6">
          <label htmlFor="fnacimiento">Fecha de Nacimiento</label>
          <input 
          type="date" 
          className="form-control" 
          id="fnacimiento" 
          name="fnacimiento" 
          placeholder="Fecha de Nacimiento" required 
          onChange={(event) =>{setFecha(event.target.value)}}/>
          </div>
          <div className="form-group col-lg-4 col-md-4 col-sm-4 col-6">
          <label htmlFor="secc">Sección</label>
          <input 
          type="text" 
          className="form-control" 
          id="secc" 
          name="secc" 
          placeholder="Sección" required 
          onChange={(event) =>{setSeccion(event.target.value)}}/>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="">
        <div className="row px-1">
          <div className="form-group col-lg-3 col-md-3">
            <label htmlFor="df">Distrito Federal</label>
            <input 
            type="number" 
            className="form-control" 
            id="df" 
            name="df" required 
            onChange={(event) =>{setDfederal(event.target.value)}} />
            
          </div>
          <div className="form-group col-lg-3 col-md-3">
            <label htmlFor="dl">Distrito Local</label>
            <input 
            type="number" 
            className="form-control" 
            id="dl" 
            name="dl" required 
            onChange={(event) =>{setDlocal(event.target.value)}} />
            
          </div>
          <div className="form-group col-lg-3 col-md-3">
          <button onClick={submitSeccion}  className="btn btn-primary btn-sm distritos" type="submit">Asignar Distritos</button>
          </div>
          <div className="form-group col-lg-3 col-md-3">
            <label htmlFor="nivel">Nivel</label>
            <select 
            className="form-control mr-1"  
            id="nivel" 
            name="nivel" required 
            onChange={(event) =>{setNivel(event.target.value)}}>
                <option value="" defaultValue>Elije un nivel</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
               
              </select>
          </div>
        </div>
      </div>
      <hr />
      <div className="">
        <div className="row px-1">
          <div className="form-group col-lg-4 col-md-6">
            <label htmlFor="cel">No. Celular</label>
            <input 
            type="text" 
            className="form-control" 
            id="cel" 
            name="cel" required 
            onChange={(event) =>{setCelular(event.target.value)}} />
          </div>
          <div className="form-group col-lg-4 col-md-6">
            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required 
            onChange={(event) =>{setEmail(event.target.value)}}/>
            
          </div>
          <div className="form-group col-lg-4 col-md-6">
            <label htmlFor="fb">Facebook</label>
            <input 
            type="text" 
            className="form-control" 
            id="fb" 
            name="fb" 
            placeholder=""  required 
            onChange={(event) =>{setFacebook(event.target.value)}}/>
            
          </div>
          
        </div>
      </div>

      <div className="">
        <div className="row px-1">
          <div className="form-group col-lg-6 col-md-6">
          <label htmlFor="tw">Twitter</label>
            <input 
            type="text" 
            className="form-control" 
            id="tw" 
            name="tw" 
            placeholder=""  required 
            onChange={(event) =>{setTwitter(event.target.value)}} />
            
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <label htmlFor="otrared">Otra red social</label>
            <input 
            type="text" 
            className="form-control" 
            id="otrared" 
            name="otrared" 
            placeholder=""  required 
            onChange={(event) =>{setOtra(event.target.value)}}/>
            
          </div>
          
        </div>
      </div>

      <hr></hr>
        
      <div className="">
        <div className="row px-1">
          
        <div className="form-group col-lg-6 col-md-6">
            <label htmlFor="otrared">Contacto</label>
            <input 
            type="text" 
            className="form-control" 
            id="contacto" 
            name="contacto" 
            placeholder=""  required 
            onChange={(event) =>{setContacto(event.target.value)}} />
            
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <label htmlFor="otrared">No. Celular de Contacto</label>
            <input 
            type="text" 
            className="form-control" 
            id="nocontacto" 
            name="nocontacto" 
            placeholder=""  required 
            onChange={(event) =>{setCelcontacto(event.target.value)}} />
            
          </div>
          
        </div>
      </div>  
      <hr></hr> 
       
      <div className="">
        <div className="row px-1">
          <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="tw">Descripción de Apoyo</label>
            <input 
            type="text" 
            className="form-control" 
            id="descapoyo" 
            name="descapoyo" 
            placeholder=""  required 
            onChange={(event) =>{setDescapoyo(event.target.value)}} />
            
          </div>
        </div>
      </div> 
    
      <div className="">
        <div className="row px-1">
          <div className="form-group col-lg-4 col-md-4">
          <label htmlFor="tw">Tipo de Apoyo</label>
            <select 
            className="form-control mr-1" 
            id="tipoapoyo" 
            name="tipoapoyo" required 
            onChange={(event) =>{setTipoapoyo(event.target.value)}}>
                <option value="" defaultValue>Selecciona alguna opcion</option>
                <option value="Económico">Económico</option>
                <option value="Especie">Especie</option>
                <option value="Terceros">Con terceros</option>
               
            </select>
            
          </div>
          <div className="form-group col-lg-4 col-md-4">
          <label htmlFor="tw">Monto de Apoyo</label>
            <input 
            type="number" 
            className="form-control" 
            id="montoapoyo" 
            name="montoapoyo" 
            placeholder=""  required 
            onChange={(event) =>{setMonto(event.target.value)}} />
            
          </div>
          <div className="form-group col-lg-4 col-md-4">
          <label htmlFor="tw">Alcance de Apoyo</label>
            <select 
            className="form-control mr-1" 
            id="alcanceapoyo" 
            name="alcanceapoyo" required 
            onChange={(event) =>{setAlcance(event.target.value)}}>
                <option value="" defaultValue>Selecciona alguna opcion</option>
                <option value="Personal">Personal</option>
                <option value="Familiar">Familiar</option>
                <option value="Comunitario">Comunitario</option>
               
            </select>
            
          </div>
        </div>
      </div> 
      
      <div className="">
        <div className="row">
          
          <div className="form-group col-lg-4 col-md-6"></div>
          <div className="form-group col-lg-4 col-md-6"></div>
          <div className="form-group col-lg-2 col-md-6">
          <button onClick={atras}  className="btn btn-primary " type="submit">Atrás</button>
          </div>
          <div className="form-group col-lg-2 col-md-6">
          <button onClick={submitReview}  className="btn btn-primary " type="submit">Guardar</button>
          </div>
          
        </div>
      </div>

        

       
        
        
        

        
       

       
       
        
       
       
       
      
      
    </div>
  </div>
    
    </div>*/
  );
}

export default Apoyos;
