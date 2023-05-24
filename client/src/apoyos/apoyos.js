import React, { useState, useRef,useEffect } from 'react';
import apoyo from './apoyos.png'
import Axios from 'axios';
import './apoyos.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'primeicons/primeicons.css';
import { useForm } from "react-hook-form";
import Header from '../header/header';
import { GoogleMap, KmlLayer, LoadScript, InfoWindow, Marker, Polyline, Rectangle } from '@react-google-maps/api';
import config from '../maps/config.json';
import ScriptTag from 'react-script-tag';
const mapContainerStyle = {
  width: '100%', height: '98vh', overflow: 'hidden'
};
const divStyle = {
  background: `white`,

  width: '50px',
  height: '10px',
  fontSize: '10px'
}
const option = {

  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  fullscreenControl: true,
  clickableIcons: true,
  streetViewPanorama: true,

};
const optionMap = {
  clickable: true,
  preserveViewport: true,
  screenOverlays: true,
  suppressInfoWindows: false
}


const onLoad = rectangle => {
  console.log('rectangle: ', rectangle)
}

const onClick = click => {
  console.log('click: ', click.featureData
  )
}

const onPosition = click => {
  console.log('click: ', click
  )
}


function Apoyos() {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [aPaterno, setApaterno] = useState("");
  const [aMaterno, setAmaterno] = useState("");
  const [nombres, setNombres] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [colonia, setColonia] = useState("");
  const [cp, setCp] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [claveElectoral, setClave] = useState("");
  const [curp, setCurp] = useState("");
  const [fechaNacimiento, setFecha] = useState("");
  const [seccion, setSeccion] = useState("");
  const [dFederal, setDfederal] = useState("");
  const [dLocal, setDlocal] = useState("");
  const [nivel, setNivel] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [otra, setOtra] = useState("");
  const [descrApoyo, setDescapoyo] = useState("");
  const [tipoApoyo, setTipoapoyo] = useState("");
  const [monto, setMonto] = useState("");
  const [alcance, setAlcance] = useState("");
  const [contacto, setContacto] = useState("");
  const [celContacto, setCelcontacto] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [coordenadas, setCoordenadas] = useState([19.36313799880912
    , -101.81796480831713]);
  const [newCoordenadas, setNewCoor] = useState([])
  const [changeCenter, setChangeCenter] = useState(false);

  const navigate = useNavigate();
  

  /*const center = {
    lat: document.getElementById("lat").value,
    lng:document.getElementById("lng").value
  };*/

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [peopleInfo, setPeopleInfo] = useState([]);

  const persona = 'Persona 1';
  const ref = useRef(null); 

  const atras = () => {
    let path = '/apoyos';
    navigate(path);
  }
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onLoad = rectangle => {
    console.log('rectangle: ', rectangle.latLng.lat());
    console.log('rectangle: ', rectangle.latLng.lng());
    setValue("lat",rectangle.latLng.lat())
    setValue("lng",rectangle.latLng.lng())
    setNewCoor([rectangle.latLng.lat(), rectangle.latLng.lng()])
  }
 
  const uploadFile1 = async (e) => {
    const formData = new FormData();
    console.log(fileName)
    console.log(file)
    formData.append("file", file);
    formData.append("fileName", fileName);
    //console.log(formData)
    
    try {
      const res = await Axios.post(
        "http://54.219.124.66:3001/uploadD",
        //"http://localhost:3001/uploadD",
        formData
      );

      
      var fecha= res.data.fecha_nacimiento
      fecha = fecha.split("/").reverse().join("-");
      console.log(fecha)
        setValue("nombre",res.data.nombres)
     
      setValue("apaterno",res.data.apaterno);
      setValue("amaterno",res.data.amaterno);
      setValue("calle",res.data.calle);
      setValue("numero",res.data.numero);
      setValue("colonia",res.data.colonia);
      setValue("cpostal",res.data.cp);
      setValue("ciudad",res.data.ciudad);
      setValue("celectoral",res.data.c_elector);
      setValue("curp",res.data.curp);
      setValue("fnacimiento",fecha);
      setValue("secc",res.data.seccion);
      setValue("df",res.data.distrito_federal);
      setValue("dl",res.data.distrito_local);

      setNombres(res.data.nombres)
      setApaterno(res.data.apaterno);
      setAmaterno(res.data.amaterno);
      setCalle(res.data.calle);
      setNumero(res.data.numero);
      setColonia(res.data.colonia);
      setCp(res.data.cp);
      setCiudad(res.data.ciudad);
      setClave(res.data.c_elector);
      setCurp(res.data.curp);
      setFecha(fecha);
      setSeccion(res.data.seccion);
      setDfederal(res.data.distrito_federal);
      setDlocal(res.data.distrito_local);
      submitSeccion();

    } catch (ex) {
      //console.log(ex);
    }
  };
  useEffect(() => {
    console.log(nombres);
    console.log(aPaterno);
  }, [nombres,aPaterno,aMaterno,calle,numero,colonia,cp,ciudad,fechaNacimiento,seccion,dFederal,dLocal]);

  const submitReview = () => {


    Axios.post("http://54.219.124.66:3001/api/insert",
      //"http://localhost:3001/api/insert",
      {

        apaterno: aPaterno, amaterno: aMaterno, nombres: nombres, calle: calle, numero: numero, colonia: colonia, cp: cp,
        ciudad: ciudad, clave_elector: claveElectoral, curp: curp, fecha_nacimiento: fechaNacimiento, seccion: seccion, distrito_federal: document.getElementById("df").value,
        distrito_local: document.getElementById("dl").value, nivel: nivel, no_celular: celular, email: email, facebook: facebook, twitter: twitter,
        otra_red: otra, descripcion_apoyo: descrApoyo, apoyo_tipo: tipoApoyo, monto_apoyo: monto, alcance_apoyo: alcance, contacto: contacto,
        no_celcontacto: celContacto, lat: document.getElementById("lat").value, lng: document.getElementById("lng").value
      }).then(() => {
        console.log("succes")
        //alert("AGREGADO")
        navigate('/apoyos')

      });
    /*console.log(aPaterno + aMaterno + nombres + calle + numero + colonia + cp + ciudad 
      + claveElectoral + curp + fecha + seccion + dfederal + dLocal + nivel
      + celular + email + facebook + twitter + otra + descrApoyo + tipoApoyo
      + monto + alcance + contacto + celContacto+camera_ine)*/
  }
  const submitSeccion = () => {


    Axios.post(//"http://localhost:3001/api/distritos"
    "http://54.219.124.66:3001/api/distritos", {
        seccion: document.getElementById("secc").value
      }).then((res) => {

        console.log(res.data.df)
        
        setDfederal(res.data.df)
        setDlocal(res.data.dl)
        setValue("dl",res.data.dl)
        setValue("df",res.data.df)

        console.log(seccion)


      });

  }

  const getLocation = () => {
    var direccion = calle + " " + numero + ", " + colonia + ", " + cp + " " + ciudad
    document.getElementById("direc").setAttribute('value', direccion)
    Axios.post(/*"http://localhost:3001/getLoc/"*/"http://54.219.124.66:3001/getLoc", { direccion: document.getElementById("direc").value }).then((res) => {
      console.log(res)

      var lat = res.data.lat
      console.log(lat)
      var lng = res.data.lng
      console.log(lng)

      setNewCoor([lat, lng])
      

      setChangeCenter(true);


    })
  }


  const limpiar = e => {
    e.preventDefault()

    // do something
    setValue("nombre","");
    setValue("apaterno","");
    setValue("amaterno","");
    setValue("calle","");
    setValue("numero","");
    setValue("colonia","");
    setValue("cpostal","");
    setValue("ciudad","");
    setValue("celectoral","");
    setValue("curp","");
    setValue("fnacimiento","");
    setValue("secc","");
    setValue("df","");
    setValue("dl","");
    setValue("cel","");
    setValue("email","");
    setValue("fb","");
    setValue("tw","");
    setValue("otrared","");
    setValue("nivel","");
    setValue("contacto","");
    setValue("nocontacto","");
    setValue("descapoyo","");
    setValue("tipoapoyo","");
    setValue("montoapoyo","");
    setValue("alcanceapoyo","");

  }
 

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setFile();
  };
  const { register, handleSubmit,setValue, formState: { errors }} = useForm();
  
  const handleRegistration = (data) => console.log(data);
  const onSubmit = (data) => {
    
    alert(JSON.stringify(data));
    submitReview();
  }; // your form submit function which will invoke after successful validation

 

  return (
    <div>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous" />


      <Header></Header>


      <div className="row">
        <div className="col-5" >

          <div className="card-header text-center">REGISTRO DE APOYOS</div>
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="card-body text-center vertical-scrollable ">

              <br></br>
              <input type="file"
                className="form-control"
                id="ine"
                capture='enviroment'
                name="ine"
                accept='image/*'
                encType="multipart/form-data"
                required onChange={saveFile} /> <br></br>
              <button onClick={uploadFile1} className="btn btn-dark btn-md cargar" type="submit">Cargar INE</button>
              <br />


              <input
                {...register("lat", {
                  required: true,
                })}
                placeholder='latitud'
                type="hidden"
                name="lat" id='lat' 
                
                value={newCoordenadas[0] || ''}/> 
              <input 
              {...register("lng", {
                  required: true,
                })}
              placeholder='longitud' 
               type='hidden'
              name='lng' 
              id='lng' 
              value={newCoordenadas[1] || ''}/>
              {file && (
                <div className='row'>
                  <div className='col-2'></div>
                  <div className='col-1'><button className='delete' onClick={removeSelectedImage} >
                    X
                  </button></div>
                  <div className='col-9'>
                    <div className='preview' >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Thumb"
                      />


                    </div>
                  </div>


                </div>
              )}
              <div className="row gx-3 mb-3">
                <div className=" col-12">
                  <label htmlFor="nombre">Nombre(s)</label>
                  <input
                    {...register("nombre", {
                      required: true,
                      pattern: /^[A-Za-z.\s_-]+$/
                      
                    })}
                    
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    
                    
                    placeholder="Nombre (s)"
                    onChange={e => setNombres(e.target.value) }
                    
                   
                  />
                  {errors?.nombre?.type === "required" && <span className='eform'>Campo Vacio </span>}
                  {errors?.nombre?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres alfabeticos</span>
                  )}

                </div>
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label htmlFor="apaterno">Apellido Paterno</label>
                  <input
                    {...register("apaterno", {
                      required: true,
                      pattern: /^[A-Za-z.\s_-]+$/

                    })}
                    
                    className="form-control"
                    id="apaterno"
                    name="apaterno"
                    placeholder="Apellido Paterno" 
                    onChange={e => { setApaterno(e.target.value) }}
                    />
                    
                  {errors?.apaterno?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.apaterno?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres alfabeticos</span>
                  )}

                </div>

                <div className="col-md-6">
                  <label htmlFor="amaterno">Apellido Materno</label>
                  <input
                    {...register("amaterno", {
                      required: true,
                      pattern: /^[A-Za-z.\s_-]+$/
                    })}
                    
                    className="form-control"
                    id="amaterno"
                    name="amaterno"
                    
                    placeholder="Apellido Materno" 
                    onChange={e => { setAmaterno(e.target.value) }} />
                  {errors?.amaterno?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.amaterno?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres alfabeticos</span>
                  )}
                </div>
              </div>

              <div className="row gx-3 mb-3">

                <div className="col-md-8">
                  <label htmlFor="calle">Calle</label>
                  <input
                    {...register("calle", {
                      required: true,
                      pattern: /^[A-Za-z.\s_-]+$/
                    })}
                    
                    className="form-control"
                    id="calle"
                    name="calle"
                    
                    placeholder="Calle" required
                    onChange={e => { setCalle(e.target.value) }} />
                  {errors?.calle?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.calle?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres alfabeticos</span>
                  )}
                </div>

                <div className="col-md-4">
                  <label htmlFor="numero">No.</label>
                  <input
                    {...register("numero", {
                      required: true,
                      pattern: /^(0|[1-9]\d*)(\.\d+)?$/
                    })}
                    
                    className="form-control"
                    id="numero"
                    name="numero"
                    
                    placeholder="Número" required
                    onChange={e => { setNumero(e.target.value) }} />
                  {errors?.numero?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.numero?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres numericos</span>
                  )}
                </div>
              </div>
              <div className="row gx-3 mb-3">

                <div className="col-md-8">
                  <label htmlFor="colonia">Colonia</label>
                  <input
                    {...register("colonia", {
                      required: true,
                      pattern: /^[A-Za-z.\s_-]+$/
                    })}
                    
                    className="form-control"
                    id="colonia"
                    name="colonia"
                   
                    placeholder="Colonia" required
                    onChange={e => { setColonia(e.target.value) }} />
                  {errors?.colonia?.type === "required" && <span className='eform'>Campo Vacio</span>}

                </div>

                <div className="col-md-4">
                  <label htmlFor="cpostal">CP</label>
                  <input
                    {...register("cpostal", {
                      required: true,
                      pattern: /^(0|[1-9]\d*)(\.\d+)?$/
                    })}
                    
                    className="form-control"
                    id="cpostal"
                    name="cpostal"
                    
                    placeholder="Código Postal" required
                    onChange={e => { setCp(e.target.value) }} />
                  {errors?.cpostal?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.cpostal?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres numericos</span>
                  )}
                </div>
              </div>
              <div className="row gx-3 mb-3">

                <div className="col-md-6">
                  <label htmlFor="colonia">Ciudad</label>
                  <input
                    {...register("ciudad", {
                      required: true,
                      pattern: /^[A-Za-z.\s_-]+$/
                    })}
                    
                    className="form-control"
                    id="ciudad"
                    name="ciudad"
                   
                    placeholder="Ciudad" required
                    onChange={e => { setCiudad(e.target.value) }} />
                  {errors?.ciudad?.type === "required" && <span className='eform'>Campo Vacio</span>}
                </div>


                <div className="col-md-6">
                  <label htmlFor="celectoral">Clave Electoral</label>
                  <input
                    {...register("celectoral", {
                      required: true,
                      pattern: /^[a-zA-Z0-9]+$/
                    })}
                    
                    className="form-control"
                    id="celectoral"
                    name="celectoral"
                    
                    placeholder="Clave electoral" required
                    onChange={e => { setClave(e.target.value) }} />
                  {errors?.celectoral?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.celectoral?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres alfanumericos</span>
                  )}
                </div>
              </div>
              <input type="hidden" readOnly id="direc" />

              <div className="row gx-3 mb-3">

                <div className="col-md-6">
                  <label htmlFor="curp">CURP</label>
                  <input
                    {...register("curp", {
                      required: true,
                      pattern: /^[a-zA-Z0-9]+$/
                    })}
                    
                    className="form-control"
                    id="curp"
                    
                    name="curp"
                    placeholder="CURP" required
                    onChange={e => { setCurp(e.target.value) }} />
                  {errors?.curp?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.curp?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres alfanumericos</span>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="fnacimiento">Fecha de Nacimiento</label>
                  <input
                    {...register("fnacimiento", {
                      required: true,

                    })}
                    type="date"
                    className="form-control"
                    
                    id="fnacimiento"
                    name="fnacimiento"
                    placeholder="Fecha de Nacimiento" required
                    onChange={e => { setFecha(e.target.value) }} />
                  {errors?.fechanacimiento?.type === "required" && <span className='eform'>Campo Vacio</span>}

                </div>
              </div>


              <div className="row gx-3 mb-3">
                <div className="col-md-4 mb-3">
                  <label htmlFor="secc">Sección</label>
                  <input
                    {...register("secc", {
                      required: true,
                      pattern: /^(0|[1-9]\d*)(\.\d+)?$/
                    })}
                    
                    className="form-control"
                    id="secc"
                    name="secc"
                    placeholder="Sección" required
                    onChange={e => { setSeccion(e.target.value) }} />
                  {errors?.secc?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.secc?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres numericos</span>
                  )}
                </div>


                <div className="col-md-4">
                  <label htmlFor="df">Distrito Federal</label>
                  <input
                    {...register("df", {
                      required: true,
                      pattern: /^(0|[1-9]\d*)(\.\d+)?$/
                    })}
                    
                    className="form-control"
                    id="df"
                   
                    name="df" required
                    onChange={e => { setDfederal(e.target.value) }} />
                  {errors?.df?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.df?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres numericos</span>
                  )}
                </div>

                <div className="col-md-4">
                  <label htmlFor="dl">Distrito Local</label>
                  <input
                    {...register("dl", {
                      required: true,
                      pattern: /^(0|[1-9]\d*)(\.\d+)?$/
                    })}
                    
                    className="form-control"
                    id="dl"
                    
                    name="dl" required
                    onChange={e => { setDlocal(e.target.value) }} />
                  {errors?.dl?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.dl?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres numericos</span>
                  )}
                </div>
               


              </div>
              <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                  <button className="btn btn-dark btn-md cargar" onClick={getLocation} id="georeferenciar" type="button">Georeferenciar</button>
                </div>
                <div className='col-md-2'></div>
              </div>
              <hr id="division"></hr>
              <div className="row gx-3 mb-3">

                <div className="col-md-6">
                  <label htmlFor="cel">No. Celular</label>
                  <input
                    {...register("cel", {
                      required: true,
                      pattern: /^(0|[1-9]\d*)(\.\d+)?$/
                    })}
                    
                    className="form-control"
                    id="cel"
                    name="cel" required
                    onChange={e => { setCelular(e.target.value) }} />
                  {errors?.cel?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.cel?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres numericos</span>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="email">Email</label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
                    })}
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required
                    onChange={e => { setEmail(e.target.value) }} />
                  {errors?.email?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.email?.type === "pattern" && (
                    <span className='eform'>Ingresa formato de correo electrónico</span>
                  )}
                </div>
              </div>


              <div className="row gx-3 mb-3">

                <div className="col-md-6">
                  <label htmlFor="fb">Facebook</label>
                  <input
                    {...register("fb", {
                      required: true,
                      pattern: /^[a-z][a-z\s]*$/
                    })}
                   
                    className="form-control"
                    id="fb"
                    name="fb"
                    placeholder="" required
                    onChange={e => { setFacebook(e.target.value) }} />
                  {errors?.fb?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.fb?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres alfabeticos</span>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="tw">Twitter</label>
                  <input
                    {...register("tw", {
                      required: true,
                      pattern: /^[a-z][a-z\s]*$/
                    })}
                    
                    className="form-control"
                    id="tw"
                    name="tw"
                    placeholder="" required
                    onChange={e => { setTwitter(e.target.value) }} />
                  {errors?.tw?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.tw?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres alfabeticos</span>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <div className="mb-3">
                    <label htmlFor="otrared">Otra red social</label>
                    <input
                      {...register("otrared", {
                        required: true,
                        pattern: /^[a-z][a-z\s]*$/
                      })}
                      
                      className="form-control"
                      id="otrared"
                      name="otrared"
                      placeholder="" required
                      onChange={e=> { setOtra(e.target.value) }} />
                    {errors?.otrared?.type === "required" && <span className='eform'>Campo Vacio</span>}
                    {errors?.otrared?.type === "pattern" && (
                      <span className='eform'>Ingresa solamente caracteres alfabeticos</span>
                    )}
                  </div></div>
                <div className='col-md-6'>
                  <label className="small mb-1" htmlFor="nivel">Circulo</label>
                  <select
                    {...register("nivel", {
                      required: true,

                    })}
                    className="form-control"
                    id="nivel"

                    name="nivel" required
                    onChange={e => { setNivel(e.target.value) }}
                  >
                    <option value="">Que tan cercano es al@ candidat@</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>

                  </select>
                  {errors?.nivel?.type === "required" && <span className='eform'>Selecciona una opción válida</span>}
                </div>
              </div>
              <div className="row gx-3 mb-3">

                <div className="col-md-6">
                  <label htmlFor="otrared">Contacto a través de:</label>
                  <input
                    {...register("contacto", {
                      required: true,
                      pattern: /^[a-z][a-z\s]*$/
                    })}
                    
                    className="form-control"
                    id="contacto"
                    name="contacto"
                    placeholder="" required
                    onChange={e => { setContacto(e.target.value) }} />
                  {errors?.contacto?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.contacto?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres alfabeticos</span>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="otrared">No. Celular del contacto</label>
                  <input
                    {...register("nocontacto", {
                      required: true,
                      pattern: /^(0|[1-9]\d*)(\.\d+)?$/
                    })}
                    
                    className="form-control"
                    id="nocontacto"
                    name="nocontacto"
                    placeholder="" required
                    onChange={e=> { setCelcontacto(e.target.value) }} />
                  {errors?.nocontacto?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.nocontacto?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres numericos</span>
                  )}
                </div>
              </div>
              <hr></hr>
              <div className="mb-3">
                <label htmlFor="tw">Descripción de Apoyo</label>
                <textarea
                  {...register("descapoyo", {
                    required: true,
                    pattern:/^[A-Za-z.\s_-]+$/
                  })}
                  
                  className="form-control"
                  id="descapoyo"
                  name="descapoyo"
                  placeholder="" required
                  onChange={e => { setDescapoyo(e.target.value) }} />
                {errors?.descapoyo?.type === "required" && <span className='eform'>Campo Vacio</span>}
                {errors?.descapoyo?.type === "pattern" && (
                  <span className='eform'>Ingresa solo caracteres alfabeticos</span>
                )}
              </div>

              <div className="row gx-3 mb-3">

                <div className="col-md-4">
                  <label className="small mb-1" htmlFor="tipoapoyo">Tipo de Apoyo</label>
                  <select
                    {...register("tipoapoyo", {
                      required: true,

                    })}
                    className="form-control mr-1"
                    id="tipoapoyo"
                    name="tipoapoyo" required
                    onChange={e=> { setTipoapoyo(e.target.value) }}
                  >
                    <option value="" >Selecciona alguna opcion</option>
                    <option value="Económico">Económico</option>
                    <option value="Especia">Especie</option>
                    <option value="Con terceros">Con terceros</option>

                  </select>
                  {errors?.tipoapoyo?.type === "required" && <span className='eform'>Selecciona una opción válida</span>}
                </div>

                <div className="col-md-4">
                  <label htmlFor="tw">Monto de Apoyo</label>
                  <input
                    {...register("montoapoyo", {
                      required: true,
                      pattern: /^(0|[1-9]\d*)(\.\d+)?$/
                    })}
                    
                    className="form-control"
                    id="montoapoyo"
                    name="montoapoyo"
                    placeholder="" required
                    onChange={e => { setMonto(e.target.value) }} />
                  {errors?.montoapoyo?.type === "required" && <span className='eform'>Campo Vacio</span>}
                  {errors?.montoapoyo?.type === "pattern" && (
                    <span className='eform'>Ingresa solamente caracteres numericos</span>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="small mb-1" htmlFor="alcanceapoyo">Alcance de Apoyo</label>
                  <select
                    {...register("alcanceapoyo", {
                      required: true,

                    })}
                    className="form-control mr-1"
                    id="alcanceapoyo"
                    name="alcanceapoyo" required
                    onChange={e=> { setAlcance(e.target.value) }}
                  >
                    <option value="">Selecciona alguna opcion</option>
                    <option value="Personal">Personal</option>
                    <option value="Familiar">Familiar</option>
                    <option value="Comunitario">Comunitario</option>

                  </select>
                  {errors?.alcanceapoyo?.type === "required" && <span className='eform'>Selecciona una opción válida</span>}
                </div>
              </div>

              <div className="row gx-3 mb-3">

                
              <div className="col-md-2"></div>
                <div className="col-md-4">
                  <button id="limpiar" className="btn btn-danger" onClick={limpiar} type="button"> Limpiar datos </button>
                
                </div>
                <div className="col-md-4">
                  <button className="btn btn-success" onClick={handleSubmit(onSubmit)} type="submit">Guardar cambios</button>
                  {errors?.lat?.type === "required" && <span className='eform'>Olvidaste Georeferenciar tu domicilio</span>}
                </div>
                <div className="col-md-2"></div>
                
              </div>
              <br></br>
            </div>
          </form>
        </div>
        <div className="col-7" >

          {changeCenter == false && (
            <LoadScript googleMapsApiKey={config.GOOGLE_MAP_API_KEY}>
              <GoogleMap
                id="rectangle-example"
                mapContainerStyle={mapContainerStyle}
                zoom={9}
                center={{ lat: coordenadas[0], lng: coordenadas[1] }}
                options={option}

              >
              </GoogleMap>
            </LoadScript>
          )}
          {changeCenter == true && (
            <LoadScript googleMapsApiKey={config.GOOGLE_MAP_API_KEY}>
              <GoogleMap
                id="rectangle-example"
                mapContainerStyle={mapContainerStyle}
                zoom={18}
                center={{ lat: newCoordenadas[0], lng: newCoordenadas[1] }}
                options={option}



              >
                <Marker
                  draggable={true}
                  onDragEnd={onLoad}
                  position={{ lat: newCoordenadas[0], lng: newCoordenadas[1] }}>

                </Marker>




              </GoogleMap>
            </LoadScript>
          )}



        </div>
      </div>

    </div>





  );
}

export default Apoyos;
