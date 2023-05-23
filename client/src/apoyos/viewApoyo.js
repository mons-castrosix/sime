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
function ViewAp() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [list, setList] = useState([])
    const [nivel, setNivel] = useState(0);
    const [alcance, setAlcance] = useState('');
    const [newCoordenadas, setNewCoor] = useState([])
    const [tipoApoyo, setTipoapoyo] = useState('');
    
    const getList = () => {
        Axios.post("http://54.219.124.66:3001/apoyos-view/"+id,
            //"http://localhost:3001/apoyos-view/" + id,
        ).then((response) => {
            setList(response.data)
            console.log(list)
            document.getElementById("amaterno").setAttribute('value', list[0].amaterno)
            document.getElementById("apaterno").setAttribute('value', list[0].apaterno)
            document.getElementById("nombre").setAttribute('value', list[0].nombres)
            document.getElementById("calle").setAttribute('value', list[0].calle)
            document.getElementById("numero").setAttribute('value', list[0].numero)
            document.getElementById("colonia").setAttribute('value', list[0].colonia)
            document.getElementById("cp").setAttribute('value', list[0].cp)
            document.getElementById("ciudad").setAttribute('value', list[0].ciudad)
            document.getElementById("celectoral").setAttribute('value', list[0].clave_elector)
            document.getElementById("dfederal").setAttribute('value', list[0].distrito_federal)
            document.getElementById("dlocal").setAttribute('value', list[0].distrito_local)

            document.getElementById("nivel").selectedIndex = list[0].nivel //select
            document.getElementById("ncelular").setAttribute('value', list[0].no_celular)
            document.getElementById("email").setAttribute('value', list[0].email)
            document.getElementById("facebook").setAttribute('value', list[0].facebook)
            document.getElementById("twitter").setAttribute('value', list[0].twitter)
            document.getElementById("ncelular").setAttribute('value', list[0].no_celular)
            document.getElementById("otrared").setAttribute('value', list[0].otra_red)
            document.getElementById("descapoyo").setAttribute('value', list[0].descripcion)
            //select
            var t = list[0].tipo
            if (t == 'Especie') {
                document.getElementById("tipoapoyo").selectedIndex = 2
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
            document.getElementById("monto").setAttribute('value', list[0].monto)

            //select
            var a = list[0].alcance
            if (a == 'Personal') {
                document.getElementById("alcanceapoyo").selectedIndex = 1
            }
            else {
                if (a == 'Familiar') {
                    document.getElementById("alcanceapoyo").selectedIndex = 2
                }
                else {
                    if (a == 'Comunitario') {
                        document.getElementById("alcanceapoyo").selectedIndex = 3
                    }
                }
            }
            document.getElementById("contacto").setAttribute('value', list[0].contacto)
            document.getElementById("celcontacto").setAttribute('value', list[0].no_celcontacto)
            setNewCoor([list[0].lat,list[0].lng])

        });
    }
    const atras = () => {
        let path = '/apoyos';
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

                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="nombre">Nombre (s)</label>
                                    <input className="form-control" id="nombre" typnamee="text" name="nombre" readOnly={true} />
                                </div>

                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="apaterno">Apellido Paterno</label>
                                        <input className="form-control" id="apaterno" type="text" name="apaterno" readOnly={true} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="amaterno">Apellido Materno</label>
                                        <input className="form-control" id="amaterno" name='amaterno' type="text" readOnly={true} />
                                    </div>
                                </div>

                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="calle">Calle</label>
                                        <input className="form-control" id="calle" name='calle' type="text" readOnly={true} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="numero">No.</label>
                                        <input className="form-control" id="numero" type="text" readOnly={true} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="colonia">Colonia</label>
                                        <input className="form-control" id="colonia" type="text" name='colonia' readOnly={true} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="cp">CP</label>
                                        <input className="form-control" id="cp" type="text" name='cp' readOnly={true} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="ciudad">Ciudad</label>
                                        <input className="form-control" id="ciudad" type="text" name='ciudad' readOnly={true} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="celectoral">Clave Electoral</label>
                                        <input className="form-control" id="celectoral" type="text" name='celectoral' readOnly={true} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">

                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="dfederal">Distrito Federal</label>
                                        <input className="form-control" id="dfederal" name='dfederal' type="text" readOnly={true} />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="dlocal">Distrito Local</label>
                                        <input className="form-control" id="dlocal" name='dlocal' type="text" readOnly={true} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="nivel">Nivel</label>
                                        <select
                                            className="form-control"
                                            id="nivel"
                                            name="nivel" required
                                            onChange={(event) => { setNivel(event.target.value) }}
                                            readOnly={true}>
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
                                        <label className="small mb-1" htmlFor="ncelular">No. Celular</label>
                                        <input className="form-control" id="ncelular" name='ncelular' type="tel" readOnly={true} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="email">Email</label>
                                        <input className="form-control" id="email" name='email' type="email" readOnly={true} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="facebook">Facebook</label>
                                        <input className="form-control" name='facebook' id="facebook" type="text" readOnly={true} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="twitter">Twitter</label>
                                        <input className="form-control" id="twitter" name='twitter' type="text" readOnly={true} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="otrared">Otra red</label>
                                    <input className="form-control" id="otrared" name='otrared' type="text" readOnly={true} />
                                </div>
                                <hr></hr>
                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="contacto">Contacto</label>
                                        <input className="form-control" id="contacto" name='contacto' type="text" readOnly={true} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="celcontacto">No. Celular Contacto</label>
                                        <input className="form-control" id="celcontacto" name='celcontacto' type="text" readOnly={true} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="descapoyo">Descripción de Apoyo</label>
                                    <input className="form-control" id="descapoyo" name='descapoyo' type="text" readOnly={true} />
                                </div>

                                <div className="row gx-3 mb-3">

                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="tipoapoyo">Tipo de Apoyo</label>
                                        <select
                                            className="form-control mr-1"
                                            id="tipoapoyo"
                                            name="tipoapoyo" required
                                            onChange={(event) => { setTipoapoyo(event.target.value) }}
                                            readOnly={true}>
                                            <option value="" >Selecciona alguna opcion</option>
                                            <option value="Económico">Económico</option>
                                            <option value="Especie">Especie</option>
                                            <option value="Con terceros">Con terceros</option>

                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="monto">Monto de Apoyo</label>
                                        <input className="form-control" id="monto" name='monto' type="text" readOnly={true} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="alcanceapoyo">Alcance de Apoyo</label>
                                        <select
                                            className="form-control mr-1"
                                            id="alcanceapoyo"
                                            name="alcanceapoyo" required
                                            onChange={(event) => { setAlcance(event.target.value) }}
                                            readOnly={true}>
                                            <option value="">Selecciona alguna opcion</option>
                                            <option value="Personal">Personal</option>
                                            <option value="Familiar">Familiar</option>
                                            <option value="Comunitario">Comunitario</option>

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
                    



                </div>
            </div>




        </div>

    );
}

export default ViewAp;
