import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Header from '../header/header';
import { LoadScript } from '@react-google-maps/api';
import { GoogleMap, KmlLayer,InfoWindow, Marker, Polyline, Rectangle } from '@react-google-maps/api';
import config from '../maps/config.json';
const mapContainerStyle = {
    width: '80%', height: '60vh', overflow: 'hidden'
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
function ViewLideres() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [list, setList] = useState([])
    const [nivel, setNivel] = useState(0);
    const [alcance, setAlcance] = useState('');
    const [newCoordenadas, setNewCoor] = useState([])
    const [tipoApoyo, setTipoapoyo] = useState('');
   

    const getList = () => {
        Axios.post(//"http://localhost:3001/apoyoId",{id:id}
            "http://localhost:3001/lideres-view/" + id,
        ).then((response) => {
            setList(response.data)
          console.log(list)
            document.getElementById("amaterno").setAttribute('value', list[0].amaterno)
            document.getElementById("apaterno").setAttribute('value', list[0].apaterno)
            document.getElementById("nombre").setAttribute('value', list[0].nombres)
            document.getElementById("calle").setAttribute('value', list[0].calle)
            document.getElementById("numero").setAttribute('value', list[0].numero)
            document.getElementById("colonia").setAttribute('value', list[0].colonia)
            document.getElementById("cpostal").setAttribute('value', list[0].cp)
            document.getElementById("ciudad").setAttribute('value', list[0].ciudad)
            document.getElementById("celectoral").setAttribute('value', list[0].clave_electoral)
            document.getElementById("df").setAttribute('value', list[0].df)
            document.getElementById("dl").setAttribute('value', list[0].dl)
            document.getElementById("curp").setAttribute('value', list[0].curp)
            document.getElementById("secc").setAttribute('value', list[0].seccion)

            document.getElementById("nivel").selectedIndex = list[0].nivel //select
            document.getElementById("cel").setAttribute('value', list[0].no_celular)
            document.getElementById("email").setAttribute('value', list[0].email)
            document.getElementById("fb").setAttribute('value', list[0].facebook)
            document.getElementById("tw").setAttribute('value', list[0].twitter)
            document.getElementById("ncelular").setAttribute('value', list[0].no_celular)
            document.getElementById("otrared").setAttribute('value', list[0].otra_red)
            document.getElementById("nocontacto").setAttribute('value', list[0].no_celcontacto)
            document.getElementById("contacto").setAttribute('value', list[0].contacto)
            //select
            var t = list[0].id_tipoLider
            if (t == 'Maestro') {
                document.getElementById("tipolider").selectedIndex = 2
            }
            else {
                if (t == 'Económico') {
                    document.getElementById("tipoapoyo").selectedIndex = 1
                }
                else {
                    if (t == 'Con terceros') {
                        document.getElementById("tipoapoyo").selectedIndex = 3
                    }
                }
            }
           
           
            document.getElementById("celcontacto").setAttribute('value', list[0].no_celcontacto)
           

        });
    }
    const atras = () => {
        let path = '/lideres';
        navigate(path);
    }

    return (
        <div >
            <Header></Header>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous" />



            <div className="row">
                <div className='col-1'></div>
                <div className="col-6">
                    <br></br><br></br>
                    <div className="card">
                        <div className="card-header">Detalles</div>
                        <div className="card-body">
                            <form onLoad={getList()}>

                            <div className="row gx-3 mb-3">
                                <div className=" col-12">
                                    <label htmlFor="nombre">Nombre(s)</label>
                                    <input
                                        

                                        className="form-control"
                                        id="nombre"
                                        name="nombre"


                                        placeholder="Nombre (s)"
                                       


                                    />
                                    

                                </div>
                            </div>

                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="apaterno">Apellido Paterno</label>
                                    <input
                                       

                                        className="form-control"
                                        id="apaterno"
                                        name="apaterno"
                                        placeholder="Apellido Paterno"
                                       
                                    />

                                    

                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="amaterno">Apellido Materno</label>
                                    <input
                                        
                                        className="form-control"
                                        id="amaterno"
                                        name="amaterno"

                                        placeholder="Apellido Materno"
                                         />
                                    
                                </div>
                            </div>

                            <div className="row gx-3 mb-3">

                                <div className="col-md-8">
                                    <label htmlFor="calle">Calle</label>
                                    <input
                                       

                                        className="form-control"
                                        id="calle"
                                        name="calle"

                                        placeholder="Calle" required
                                         />
                                    
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="numero">No.</label>
                                    <input
                                        

                                        className="form-control"
                                        id="numero"
                                        name="numero"

                                        placeholder="Número" required
                                         />
                                    
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">

                                <div className="col-md-8">
                                    <label htmlFor="colonia">Colonia</label>
                                    <input
                                        

                                        className="form-control"
                                        id="colonia"
                                        name="colonia"

                                        placeholder="Colonia" required
                                        />

                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="cpostal">CP</label>
                                    <input
                                        
                                        className="form-control"
                                        id="cpostal"
                                        name="cpostal"

                                        placeholder="Código Postal" required
                                        />
                                    
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">

                                <div className="col-md-6">
                                    <label htmlFor="colonia">Ciudad</label>
                                    <input
                                       

                                        className="form-control"
                                        id="ciudad"
                                        name="ciudad"

                                        placeholder="Ciudad" required
                                        />
                                </div>


                                <div className="col-md-6">
                                    <label htmlFor="celectoral">Clave Electoral</label>
                                    <input
                                       

                                        className="form-control"
                                        id="celectoral"
                                        name="celectoral"

                                        placeholder="Clave electoral" required
                                       />
                                    
                                </div>
                            </div>
                            <input type="hidden" readOnly id="direc" />

                            <div className="row gx-3 mb-3">

                                <div className="col-md-6">
                                    <label htmlFor="curp">CURP</label>
                                    <input
                                        

                                        className="form-control"
                                        id="curp"

                                        name="curp"
                                        placeholder="CURP" required
                                        />
                                    
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="fnacimiento">Fecha de Nacimiento</label>
                                    <input
                                       
                                        type="date"
                                        className="form-control"

                                        id="fnacimiento"
                                        name="fnacimiento"
                                        placeholder="Fecha de Nacimiento" required
                                         />

                                </div>
                            </div>


                            <div className="row gx-3 mb-3">
                                <div className="col-3 mb-3">
                                    <label htmlFor="secc">Sección</label>
                                    <input
                                       

                                        className="form-control"
                                        id="secc"
                                        name="secc"
                                        placeholder="Sección" required
                                        />
                                   
                                </div>


                                <div className="col-4">
                                    <label htmlFor="df">Distrito Federal</label>
                                    <input
                                       

                                        className="form-control"
                                        id="df"

                                        name="df" required
                                        />
                                  
                                </div>

                                <div className="col-4">
                                    <label htmlFor="dl">Distrito Local</label>
                                    <input
                                       

                                        className="form-control"
                                        id="dl"

                                        name="dl" required
                                        />
                                    
                                </div>
                                <div className="col-1">
                                </div>


                            </div>
                            <div className='row'>
                                <div className='col-2'></div>
                                <div className='col-8'>
                                </div>
                                <div className='col-2'></div>
                            </div>
                            <hr id="division"></hr>
                            <div className="row gx-3 mb-3">

                                <div className="col-md-6">
                                    <label htmlFor="cel">No. Celular</label>
                                    <input
                                       

                                        className="form-control"
                                        id="cel"
                                        name="cel" required
                                         />
                                    
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="email">Email</label>
                                    <input
                                       
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required
                                         />
                                    
                                </div>
                            </div>


                            <div className="row gx-3 mb-3">

                                <div className="col-md-6">
                                    <label htmlFor="fb">Facebook</label>
                                    <input
                                        

                                        className="form-control"
                                        id="fb"
                                        name="fb"
                                        placeholder="" required
                                        />
                                    
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="tw">Twitter</label>
                                    <input
                                        

                                        className="form-control"
                                        id="tw"
                                        name="tw"
                                        placeholder="" required
                                        />
                                   
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="mb-3">
                                        <label htmlFor="otrared">Otra red social</label>
                                        <input
                                            
                                            className="form-control"
                                            id="otrared"
                                            name="otrared"
                                            placeholder="" required
                                            />
                                        
                                    </div></div>
                                <div className='col-6'>
                                    <label className="small mb-1" htmlFor="nivel">Circulo</label>
                                    <select
                                       
                                        className="form-control"
                                        id="nivel"

                                        name="nivel" required
                                        
                                    >
                                        <option value="">Que tan cercano es al@ candidat@</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>

                                    </select>
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">

                                <div className="col-md-6">
                                    <label htmlFor="otrared">Contacto a través de:</label>
                                    <input
                                        
                                        className="form-control"
                                        id="contacto"
                                        name="contacto"
                                        placeholder="" required
                                        />
                                    
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="otrared">No. Celular del contacto</label>
                                    <input
                                        

                                        className="form-control"
                                        id="nocontacto"
                                        name="nocontacto"
                                        placeholder="" required
                                        />
                                   
                                </div>
                            </div>
                            <hr id="division"></hr>


                            <div className="row gx-3 mb-3">

                                <div className="col-md-5">
                                    <label htmlFor="tipoapoyo">Tipo de líder territorial</label>
                                </div>

                                <div className="col-md-7">
                                    <select
                                       
                                        className="form-control mr-1"
                                        id="tipolider"
                                        name="tipolider" required
                                       
                                    >
                                        <option value="">Selecciona alguna opcion</option>
                                        <option value="1">Sacerdote</option>
                                        <option value="2">Lider Partidista</option>
                                        <option value="3">Maestro</option>
                                        <option value="4">Jefe de tenencia</option>
                                        <option value="5">Encargado del orden</option>
                                        <option value="6">Asociacion civil</option>
                                        <option value="7">Otro</option>
                                    </select>
                                </div>

                            </div>
                            




                                <button className="btn btn-primary" onClick={atras} type="button">Regresar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-5" >

                    
                    <br></br><br></br>
                        <LoadScript googleMapsApiKey={config.GOOGLE_MAP_API_KEY}>
                            <GoogleMap
                                id="rectangle-example"
                                mapContainerStyle={mapContainerStyle}
                                zoom={18}
                                center={{ lat: list.lat, lng: list.lng }}
                                options={option}



                            >
                                <Marker
                                    draggable={true}
                                    onDragEnd={onLoad}
                                    position={{ lat: newCoordenadas[0], lng: newCoordenadas[1] }}>

                                </Marker>




                            </GoogleMap>
                        </LoadScript>
                    



                </div>
            </div>




        </div>

    );
}

export default ViewLideres;
