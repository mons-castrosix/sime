import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { MultiSelect } from 'primereact/multiselect';
import Header from '../header/header';
import { LoadScript } from '@react-google-maps/api';
import { GoogleMap, KmlLayer, InfoWindow, Marker, Polyline, Rectangle } from '@react-google-maps/api';
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
    //console.log('rectangle: ', rectangle)
}
function ViewLideres() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [list, setList] = useState([])
    const [list3, setList3] = useState([])
    const [nivel, setNivel] = useState(0);
    const [alcance, setAlcance] = useState('');
    const [newCoordenadas, setNewCoor] = useState([])
    const [lid, setLid] = useState('');
    const [lider, setLider] = useState("");
    const [selectedSeccion, setSelectedSeccion] = useState(null);

    const [seccionInjerencia, setSeccionInjerencia] = useState("");
    const [obs, setObs] = useState("");
    const getList = async (e) => {

        try {
            const response = await Axios.post(//"http://localhost:3001/apoyoId",{id:id}
                "http://localhost:3001/lideres-view/" + id,
            );
            //setList(response.data)
            //console.log(list)
            document.getElementById("amaterno").setAttribute('value', response.data.amaterno)
            document.getElementById("apaterno").setAttribute('value', response.data.apaterno)
            document.getElementById("nombre").setAttribute('value', response.data.nombres)
            document.getElementById("calle").setAttribute('value', response.data.calle)
            document.getElementById("numero").setAttribute('value', response.data.numero)
            document.getElementById("colonia").setAttribute('value', response.data.colonia)
            document.getElementById("cpostal").setAttribute('value', response.data.cp)
            document.getElementById("ciudad").setAttribute('value', response.data.ciudad)
            document.getElementById("celectoral").setAttribute('value', response.data.clave_electoral)
            document.getElementById("df").setAttribute('value', response.data.df)
            document.getElementById("dl").setAttribute('value', response.data.dl)
            document.getElementById("curp").setAttribute('value', response.data.curp)
            document.getElementById("secc").setAttribute('value', response.data.seccion)
            var fecha = response.data.fecha_nacimiento
            fecha = fecha.split("/").reverse().join("-");
            //console.log(fecha)
            document.getElementById("fnacimiento").setAttribute('value', fecha)
            document.getElementById("nivel").selectedIndex = response.data.circulo //select
            document.getElementById("cel").setAttribute('value', response.data.no_celular)
            document.getElementById("email").setAttribute('value', response.data.email)
            document.getElementById("fb").setAttribute('value', response.data.facebook)
            document.getElementById("tw").setAttribute('value', response.data.twitter)

            document.getElementById("otrared").setAttribute('value', response.data.otra_red)
            document.getElementById("nocontacto").setAttribute('value', response.data.no_celcontacto)
            document.getElementById("contacto").setAttribute('value', response.data.contacto)
            document.getElementById("tipolider").selectedIndex = response.data.id_tipoLider //select

            setLider(response.data.id_tipoLider);
            //alert(lider)
            if (response.data.id_tipoLider == 1) {
                var fecha2 = response.data.fiesta;
                fecha2 = fecha2.split("/").reverse().join("-");
                console.log(fecha2)
                document.getElementById("calleIglesia").setAttribute('value', response.data.calle_iglesia)
                document.getElementById("noIglesia").setAttribute('value', response.data.no_iglesia)
                document.getElementById("celebracion").setAttribute('value', fecha2)

                document.getElementById("coloniaIglesia").setAttribute('value', response.data.colonia_ig)

            }
            if (response.data.id_tipoLider == 6) {
                document.getElementById("asoCivil").setAttribute('value', response.data.nomas)
                document.getElementById("cargo").setAttribute('value', response.data.acargo)
            }




            setObs(response.data.observaciones)
            setNewCoor([response.data.lat, response.data.lng])

        } catch (ex) {

        }






    }
    const submitSecciones = async (e) => {

        try {
           const response=await Axios.post("http://localhost:3001/injerenciaLider/" + id
            /*"http://54.219.124.66:3001/api/distritos"*/, {

            });
            
           
            setList(response.data)
            

        } catch (ex) {

        }
        
    }
    const submitSecciones2 = () => {


        Axios.post("http://localhost:3001/api/distritosAll"
            /*"http://54.219.124.66:3001/api/distritos"*/, {

            }).then((response) => {
                var resultado = JSON.stringify(response.data);
                var empObj = JSON.parse(resultado);
                setList3(empObj)


            });

    }
    const secs=[];
    console.log(list)
    list.map(val =>{
        
        secs.push(val.seccion_id)
    })
    console.log(secs)
    useEffect(() => {
        getList();
        submitSecciones();
        submitSecciones2();

        console.log(lider)
    }, [lider]);
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
                        <div className="card-header text-center text-white font-weight-bold">DETALLES</div>
                        <div className="card-body rounded-3 text-center bg-light">
                            <form >

                                <div className="row gx-3 mb-3">
                                    <div className=" col-12">
                                        <label htmlFor="nombre">Nombre(s)</label>
                                        <input
                                            readOnly

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
                                            readOnly

                                            className="form-control"
                                            id="apaterno"
                                            name="apaterno"
                                            placeholder="Apellido Paterno"

                                        />



                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="amaterno">Apellido Materno</label>
                                        <input
                                            readOnly
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
                                            readOnly

                                            className="form-control"
                                            id="calle"
                                            name="calle"

                                            placeholder="Calle" required
                                        />

                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="numero">No.</label>
                                        <input
                                            readOnly

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

                                            readOnly
                                            className="form-control"
                                            id="colonia"
                                            name="colonia"

                                            placeholder="Colonia" required
                                        />

                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="cpostal">CP</label>
                                        <input
                                            readOnly
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
                                            readOnly

                                            className="form-control"
                                            id="ciudad"
                                            name="ciudad"

                                            placeholder="Ciudad" required
                                        />
                                    </div>


                                    <div className="col-md-6">
                                        <label htmlFor="celectoral">Clave Electoral</label>
                                        <input
                                            readOnly

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

                                            readOnly
                                            className="form-control"
                                            id="curp"

                                            name="curp"
                                            placeholder="CURP" required
                                        />

                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="fnacimiento">Fecha de Nacimiento</label>
                                        <input
                                            readOnly
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

                                            readOnly
                                            className="form-control"
                                            id="secc"
                                            name="secc"
                                            placeholder="Sección" required
                                        />

                                    </div>


                                    <div className="col-4">
                                        <label htmlFor="df">Distrito Federal</label>
                                        <input
                                            readOnly

                                            className="form-control"
                                            id="df"

                                            name="df" required
                                        />

                                    </div>

                                    <div className="col-4">
                                        <label htmlFor="dl">Distrito Local</label>
                                        <input
                                            readOnly

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
                                            readOnly

                                            className="form-control"
                                            id="cel"
                                            name="cel" required
                                        />

                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            readOnly
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
                                            placeholder="" required readOnly
                                        />

                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="tw">Twitter</label>
                                        <input


                                            className="form-control"
                                            id="tw"
                                            name="tw"
                                            placeholder="" required
                                            readOnly
                                        />

                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <label htmlFor="otrared">Otra red social</label>
                                            <input
                                                readOnly
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
                                            readOnly
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
                                            readOnly
                                            className="form-control"
                                            id="contacto"
                                            name="contacto"
                                            placeholder="" required
                                        />

                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="otrared">No. Celular del contacto</label>
                                        <input
                                            readOnly

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
                                            disabled
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

                                {
                                    (() => {
                                        switch (lider) {

                                            case (1): {
                                                return (
                                                    <div>
                                                        <div className="row gx-3 mb-3">
                                                            <div className=" col-12">
                                                                <label htmlFor="nombre">Domicilio de la iglesia</label>
                                                            </div>
                                                        </div>
                                                        <div className="row gx-3 mb-3">

                                                            <div className="col-md-5">
                                                                <label htmlFor="cel">Calle</label>
                                                                <input
                                                                    readOnly
                                                                    className="form-control"
                                                                    id="calleIglesia"
                                                                    name="calleIglesia"
                                                                />

                                                            </div>

                                                            <div className="col-md-3">
                                                                <label htmlFor="email">No. Ext.</label>
                                                                <input
                                                                    readOnly
                                                                    type="noIglesia"
                                                                    className="form-control"
                                                                    id="noIglesia"
                                                                    name="noIglesia"

                                                                />

                                                            </div>
                                                            <div className="col-md-4">
                                                                <label htmlFor="email">Colonia</label>
                                                                <input
                                                                    readOnly
                                                                    type="coloniaIglesia"
                                                                    className="form-control"
                                                                    id="coloniaIglesia"
                                                                    name="coloniaIglesia"

                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="row gx-3 mb-3">

                                                            <div className="col-md-6">
                                                                <label htmlFor="cel">Celebración de fiesta patronal</label>
                                                                <input

                                                                    type="date"
                                                                    readOnly
                                                                    className="form-control"
                                                                    id="celebracion"
                                                                    name="celebracion"
                                                                />

                                                            </div>


                                                            <div className='col-6'>
                                                                <label className="small mb-1" htmlFor="nivel">Seccion(es) de injerencia</label>
                                                               
                                                                <MultiSelect
                                                                    options={list3}
                                                                    value={secs}
                                                                    onChange={(e) => setSelectedSeccion(e.value)}
                                                                    disabled
                                                                     optionLabel="name"
                                                                    filter placeholder="Selecciona una o más secciones" className="w-full md:w-20rem form-select" required />

                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                                break;

                                            case (2): {
                                                return (
                                                    <div>
                                                        <div className="row gx-3 mb-3">

                                                            <div className='col-6'>
                                                                <label htmlFor="nivel">Partido Politico</label>
                                                                <select

                                                                    className="form-control"
                                                                    id="partido"
                                                                    se
                                                                    name="partido"

                                                                >


                                                                </select>
                                                            </div>
                                                            <div className='col-6'>
                                                                <label className="small mb-1" htmlFor="nivel">Seccion(es) de injerencia</label>
                                                               
                                                                <MultiSelect

                                                                    value={seccionInjerencia}

                                                                    options={list} optionLabel="name"
                                                                    filter placeholder="Selecciona una o más secciones" className="w-full md:w-20rem form-select" required />


                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                                break;
                                            case (3): {
                                                return (
                                                    <div>
                                                        <div className="row gx-3 mb-3">

                                                            <div className="col-md-6">
                                                                <label htmlFor="cel">Nombre de la escuela</label>
                                                                <input


                                                                    className="form-control"
                                                                    id="escuela"
                                                                    name="escuela"
                                                                />

                                                            </div>

                                                            <div className="col-md-6">
                                                                <label htmlFor="cel">Cargo</label>
                                                                <select

                                                                    className="form-control"
                                                                    id="cargo"

                                                                    name="cargo"

                                                                >
                                                                    <option value="">Elige una o opción</option>
                                                                    <option value="1">Director</option>
                                                                    <option value="2">Subdirector</option>
                                                                    <option value="3">Docente</option>
                                                                    <option value="4">Administrador</option>
                                                                    <option value="5">Otro</option>


                                                                </select>

                                                            </div>

                                                        </div>
                                                    </div>)
                                            }
                                                break;
                                            case (4): {
                                                return (<div>
                                                    <div className="row gx-3 mb-3">

                                                        <div className="col-md-5">
                                                            <label htmlFor="tipoapoyo">Tenencia</label>
                                                        </div>

                                                        <div className="col-md-7">

                                                            <select

                                                                className="form-control"
                                                                id="tenencia"

                                                                name="tenencia"

                                                            >
                                                                <option value="">Elige una tenencia</option>
                                                                <option value="2">Jesús del Monte</option>
                                                                <option value="3">Capula</option>
                                                                <option value="4">Puerto de Buenavista</option>
                                                                <option value="5">San Antonio</option>
                                                                <option value="6">Bosque Monarca</option>
                                                                <option value="7">San Nicolás Obispo</option>
                                                                <option value="8">San Juanito Itzicuaro</option>
                                                                <option value="9">El Durazno</option>
                                                                <option value="10">Atapaneo</option>
                                                                <option value="11">Tiripetío</option>
                                                            </select>

                                                        </div>

                                                    </div>
                                                </div>)
                                            }
                                                break;
                                            case (5): {
                                                return (<div>
                                                    <div className="row gx-3 mb-3">

                                                        <div className="col-md-5">
                                                            <label htmlFor="tipoapoyo">Colonia</label>
                                                        </div>

                                                        <div className="col-md-7">
                                                            <input


                                                                className="form-control"
                                                                id="coloniaOrden"
                                                                name="coloniaOrden"
                                                            />

                                                        </div>

                                                    </div>
                                                </div>)
                                            } break;
                                            case (6): {
                                                return (<div>
                                                    <div className="row gx-3 mb-3">

                                                        <div className="col-md-6">
                                                            <label htmlFor="cel">Nombre de la AC</label>
                                                            <input


                                                                className="form-control"
                                                                id="asoCivil"
                                                                name="asoCivil"
                                                                readOnly
                                                            />

                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="cel">Cargo</label>
                                                            <input


                                                                className="form-control"
                                                                id="cargo"
                                                                name="cargo"
                                                                readOnly
                                                            />

                                                        </div>


                                                    </div>
                                                </div>)
                                            } break;
                                            case ("7"): {
                                                return (<div>
                                                    <div className="row gx-3 mb-3">

                                                        <div className="col-md-6">
                                                            <label htmlFor="cel">Nombre de la Institución</label>
                                                            <input


                                                                className="form-control"
                                                                id="institucion"
                                                                name="institucion"
                                                            />

                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="cel">Cargo</label>
                                                            <input


                                                                className="form-control"
                                                                id="cargo"
                                                                name="cargo" required
                                                            />

                                                        </div>
                                                    </div>
                                                </div>)
                                            } break;
                                            default: {
                                                return (
                                                    <span></span>
                                                )
                                            }
                                                break;
                                        }
                                    })()
                                }
                                <div className="mb-3">
                                    <label htmlFor="tw">Observaciones</label>
                                    <textarea

                                        className="form-control"
                                        id="observaciones"
                                        name="observaciones"
                                        placeholder=""
                                        value={obs} readOnly
                                    />

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
                            center={{ lat: parseFloat(newCoordenadas[0]), lng: parseFloat(newCoordenadas[1]) }}
                            options={option}



                        >
                            <Marker
                                draggable={true}
                                onDragEnd={onLoad}
                                position={{ lat: parseFloat(newCoordenadas[0]), lng: parseFloat(newCoordenadas[1]) }}>

                            </Marker>




                        </GoogleMap>
                    </LoadScript>




                </div>
            </div>




        </div>

    );
}

export default ViewLideres;
