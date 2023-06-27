import React, { useState, useRef, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'primeicons/primeicons.css';
import { useForm } from "react-hook-form";
import Header from '../header/header';
import '../apoyos/apoyos.css'
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
    // console.log('rectangle: ', rectangle)
}

const onClick = click => {
    //console.log('click: ', click.featureData)
}

const onPosition = click => {
    //console.log('click: ', click)
}


function Estructura() {
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
    const [calleIglesia, setCalleIglesia] = useState("");
    const [numeroIglesia, setnumeroIglesia] = useState("");
    const [coloniaIglesia, setColoniaIglesia] = useState("");
    const [celebracion, setCelebracion] = useState("");
    const [seccionInjerencia, setSeccionInjerencia] = useState("");
    const [partido, setPartido] = useState("");
    const [escuela, setEscuela] = useState("");
    const [cargo, setCargo] = useState("");
    const [tenencia, setTenencia] = useState("");
    const [coloniaEncargado, setColoniaEncargado] = useState("");
    const [nombreAC, setNombreAC] = useState("");
    const [nombreInstitucion, setNombreInstitucion] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [lider, setLider] = useState("");
    const [idSecc, setidSecc] = useState("");
    const [equipo, setEquipo] = useState("");
    const navigate = useNavigate();
    const [list, setList] = useState([])
    const [list2, setList2] = useState([])
    const [selectedSeccion, setSelectedSeccion] = useState(null);

    /*const center = {
      lat: document.getElementById("lat").value,
      lng:document.getElementById("lng").value
    };*/

    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const [peopleInfo, setPeopleInfo] = useState([]);

    const persona = 'Persona 1';
    const ref = useRef(null);

    const atras = () => {
        let path = '/estructura';
        navigate(path);
    }
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };
    const onLoad = rectangle => {
        //console.log('rectangle: ', rectangle.latLng.lat());
        //console.log('rectangle: ', rectangle.latLng.lng());
        setValue("lat", rectangle.latLng.lat())
        setValue("lng", rectangle.latLng.lng())
        setNewCoor([rectangle.latLng.lat(), rectangle.latLng.lng()])
    }

    const uploadFile1 = async (e) => {
        const formData = new FormData();
        //console.log(fileName)
        //console.log(file)
        formData.append("file", file);
        formData.append("fileName", fileName);
        //console.log(formData)

        try {
            const res = await Axios.post(
                // "http://54.219.124.66:3001/uploadD",
                "http://localhost:3001/uploadD",
                formData
            );


            var fecha = res.data.fecha_nacimiento
            fecha = fecha.split("/").reverse().join("-");
            //console.log(fecha)
            setValue("nombre", res.data.nombres)

            setValue("apaterno", res.data.apaterno);
            setValue("amaterno", res.data.amaterno);
            setValue("calle", res.data.calle);
            setValue("numero", res.data.numero);
            setValue("colonia", res.data.colonia);
            setValue("cpostal", res.data.cp);
            setValue("ciudad", res.data.ciudad);
            setValue("celectoral", res.data.c_elector);
            setValue("curp", res.data.curp);
            setValue("fnacimiento", fecha);
            setValue("secc", res.data.seccion);
            setValue("df", res.data.distrito_federal);
            setValue("dl", res.data.distrito_local);

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
        //console.log(nombres);
        //console.log(aPaterno);
    }, [nombres, aPaterno, aMaterno, calle, numero, colonia, cp, ciudad, fechaNacimiento, seccion, dFederal, dLocal]);
    const equiposList = () => {


        Axios.post("http://localhost:3001/api/equipoAll"
            /*"http://54.219.124.66:3001/api/distritos"*/, {

            }).then((response) => {
                var resultado = JSON.stringify(response.data);
                var empObj = JSON.parse(resultado);
                setList(empObj)
                //console.log(response)


            });

    }
    const submitReview = () => {

        Axios.post(//"http://54.219.124.66:3001/api/insert",
            "http://localhost:3001/api/insert-estructura",
            {

                apaterno: aPaterno, amaterno: aMaterno, nombres: nombres, calle: calle, numero: numero, colonia: colonia, cp: cp,
                ciudad: ciudad, clave_elector: claveElectoral, curp: curp, fecha_nacimiento: fechaNacimiento, seccion: seccion, distrito_federal: document.getElementById("df").value,
                distrito_local: document.getElementById("dl").value, nivel: nivel, no_celular: celular, email: email, facebook: facebook, twitter: twitter,
                otra_red: otra, lat: document.getElementById("lat").value, lng: document.getElementById("lng").value, id_Secc: idSecc, observaciones: observaciones, idEquipo: equipo, injerencia: selectedSeccion
            }).then(() => {
                Swal.fire({
                    title: 'Registro de estructura',
                    text: "Agregado existosamente",
                    icon: 'success',
                    confirmButtonColor: '#716add',
                    confirmButtonText: 'De acuerdo'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/estructura')
                    }
                })

            }).catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            });


        /*console.log(aPaterno + aMaterno + nombres + calle + numero + colonia + cp + ciudad 
          + claveElectoral + curp + fecha + seccion + dfederal + dLocal + nivel
          + celular + email + facebook + twitter + otra + descrApoyo + tipoApoyo
          + monto + alcance + contacto + celContacto+camera_ine)*/
    }
    const submitSeccion = () => {


        Axios.post("http://localhost:3001/api/distritos"
            /*"http://54.219.124.66:3001/api/distritos"*/, {
                seccion: document.getElementById("secc").value
            }).then((res) => {

                //console.log(res.data.df)

                setDfederal(res.data.df)
                setDlocal(res.data.dl)
                setidSecc(res.data.id)
                setValue("dl", res.data.dl)
                setValue("df", res.data.df)

                //console.log(seccion)


            });

    }
    const submitSecciones = () => {


        Axios.post("http://localhost:3001/api/distritosAll"
            /*"http://54.219.124.66:3001/api/distritos"*/, {

            }).then((response) => {
                var resultado = JSON.stringify(response.data);
                var empObj = JSON.parse(resultado);
                setList2(empObj)


            });

    }
    const getLocation = () => {
        var direccion = calle + " " + numero + ", " + colonia + ", " + cp + " " + ciudad
        document.getElementById("direc").setAttribute('value', direccion)
        Axios.post("http://localhost:3001/getLoc/"/*"http://54.219.124.66:3001/getLoc"*/, { direccion: document.getElementById("direc").value }).then((res) => {
            //console.log(res)

            var lat = res.data.lat
            //console.log(lat)
            var lng = res.data.lng
            //console.log(lng)

            setNewCoor([lat, lng])


            setChangeCenter(true);


        })
    }


    const limpiar = e => {
        e.preventDefault()

        // do something


        setValue("nombre", "");
        setValue("apaterno", "");
        setValue("amaterno", "");
        setValue("calle", "");
        setValue("numero", "");
        setValue("colonia", "");
        setValue("cpostal", "");
        setValue("ciudad", "");
        setValue("celectoral", "");
        setValue("curp", "");
        setValue("fnacimiento", "");
        setValue("secc", "");
        setValue("df", "");
        setValue("dl", "");
        setValue("cel", "");
        setValue("email", "");
        setValue("fb", "");
        setValue("tw", "");
        setValue("otrared", "");
        setValue("nivel", "");
        setValue("contacto", "");
        setValue("nocontacto", "");
        setValue("tipolider", "");
        setValue("observaciones", "");
        setValue("calleIglesia", "");
        setValue("noIglesia", "");
        setValue("coloniaIglesia", "");
        setValue("celebracion", "");
        setValue("seccInjerencia", "");
        setValue("partido", "");
        setValue("cargo", "");
        setValue("escuela", "");
        setValue("tenencia", "");
        setValue("coloniaOrden", "");
        setValue("asoCivil", "");
        setValue("institucion", "");


    }


    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setFile();
    };
    const { register, handleSubmit, setValue, append, formState: { errors } } = useForm();

    const handleRegistration = (data) => console.log(data);
    const onSubmit = (data) => {

        //alert(JSON.stringify(data));
        submitReview();
    }; // your form submit function which will invoke after successful validation



    return (
        <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous" />


            <Header></Header>


            <div className="row">
                <div className="col-5" >
                <div className="card " >
                <div className="card-header text-center">REGISTRO DE ESTRUCTURA</div>

                <div class="card-body rounded-3  text-center bg-light">
                   <form onSubmit={handleSubmit(handleRegistration)}>

                        <br></br>
                        <input type="file"
                            className="form-control"
                            id="ine"
                            capture='enviroment'
                            name="ine"
                            accept='image/*'
                            encType="multipart/form-data"
                            required onChange={saveFile} /> <br></br>
                        <button onClick={uploadFile1} id='ineButton' className="btn btn-dark btn-md cargar" type="submit">Cargar INE</button>
                        <br />


                        <input
                            {...register("lat", {
                                required: true,
                            })}
                            placeholder='latitud'
                            type='hidden'
                            name="lat" id='lat'

                            value={newCoordenadas[0] || ''} />
                        <input
                            {...register("lng", {
                                required: true,
                            })}
                            placeholder='longitud'
                            type='hidden'
                            name='lng'
                            id='lng'
                            value={newCoordenadas[1] || ''} />
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
                                    onChange={e => setNombres(e.target.value)}


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

                                    placeholder="Calle"
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

                                    placeholder="Número"
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

                                    placeholder="Colonia"
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

                                    placeholder="Código Postal"
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

                                    placeholder="Ciudad"
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

                                    placeholder="Clave electoral"
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
                                    placeholder="CURP"
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
                                    placeholder="Fecha de Nacimiento"
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
                                    placeholder="Sección"
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

                                    name="df"
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

                                    name="dl"
                                    onChange={e => { setDlocal(e.target.value) }} />
                                {errors?.dl?.type === "required" && <span className='eform'>Campo Vacio</span>}
                                {errors?.dl?.type === "pattern" && (
                                    <span className='eform'>Ingresa solamente caracteres numericos</span>
                                )}
                            </div>



                        </div>
                        <div className='row'>
                            <div className='col-2'></div>
                            <div className='col-8'>
                                <button className="btn btn-dark btn-md cargar" id='georeferenciar' onClick={getLocation} type="button">Georeferenciar</button>
                            </div>
                            <div className='col-2'></div>
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
                                    name="cel"
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
                                        //  required: true,
                                        pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
                                    })}
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    onChange={e => { setEmail(e.target.value) }} />
                                {errors?.email?.type === "pattern" && (
                                    <span className='eform'>Ingresa formato de correo electrónico</span>
                                )}
                            </div>
                        </div>


                        <div className="row gx-3 mb-3">

                            <div className="col-md-6">
                                <label htmlFor="fb">Facebook</label>
                                <input
                                    //{...register("fb", {
                                    //    required: true,
                                    //-    pattern: /^[A-Za-z.\s_-]+$/
                                    //})}

                                    className="form-control"
                                    id="fb"
                                    name="fb"
                                    placeholder=""
                                    onChange={e => { setFacebook(e.target.value) }} />

                            </div>

                            <div className="col-md-6">
                                <label htmlFor="tw">Twitter</label>
                                <input
                                    //{...register("tw", {
                                    //   required: true,
                                    // pattern: /^[A-Za-z.\s_-]+$/
                                    //})}

                                    className="form-control"
                                    id="tw"
                                    name="tw"
                                    placeholder=""
                                    onChange={e => { setTwitter(e.target.value) }} />

                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label htmlFor="otrared">Otra red social</label>
                                    <input
                                        //{...register("otrared", {
                                        //  required: true,
                                        //pattern: /^[A-Za-z.\s_-]+$/
                                        //})}

                                        className="form-control"
                                        id="otrared"
                                        name="otrared"
                                        placeholder=""
                                        onChange={e => { setOtra(e.target.value) }} />

                                </div></div>
                            <div className='col-md-6'>
                                <label className="small mb-1" htmlFor="nivel">Circulo</label>
                                <select
                                    //{...register("nivel", {
                                    //   required: true,

                                    //})}
                                    className="form-select"
                                    id="nivel"

                                    name="nivel"
                                    onChange={e => { setNivel(e.target.value) }}
                                >
                                    <option value="">Que tan cercano es al@ candidat@</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>

                                </select>
                            </div>
                        </div>

                        <hr id="division"></hr>


                        <div className="row gx-3 mb-3">



                            <div className="col-md-12">
                                <label htmlFor="tipoapoyo">Pertenece al equipo</label>
                                {equiposList()}
                                <select
                                    {...register("equipo", {
                                        required: true,

                                    })}
                                    className="form-select"

                                    id="equipo"
                                    name="equipo" required
                                    onChange={e => { setEquipo(e.target.value); console.log(e.target.value) }}
                                >
                                    <option value="">Selecciona alguna opcion</option>
                                    {list.map(val => {

                                        return (<option value={val.id}>{val.nombre}</option>);
                                    })}
                                </select>
                                {errors?.equipo?.type === "required" && <span className='eform'>Selecciona una opción válida</span>}
                            </div>


                        </div>

                        <div className='mb-3'>

                            {submitSecciones()}
                            <label className="small mb-1" htmlFor="nivel">Seccion(es) de injerencia</label>
                            <MultiSelect

                                value={selectedSeccion}
                                onChange={(e) => setSelectedSeccion(e.value)}
                                options={list2} optionLabel="name"
                                filter placeholder="Selecciona una o más secciones" className="form-select" required />

                            {errors?.seccInjerencia?.type === "required" && <span className='eform'>Selecciona una opción válida</span>}

                        </div>









                        <div className="mb-3">
                            <label htmlFor="tw">Observaciones</label>
                            <textarea


                                className="form-control"
                                id="observaciones"
                                name="observaciones"
                                placeholder=""
                                onChange={e => { setObservaciones(e.target.value) }} />

                        </div>

                        <div className="row gx-3 mb-3">

                            <div className="col-md-2"></div>

                            <div className="col-md-4">
                                <button className="btn btn-danger" id='limpiar' onClick={limpiar} type="button">Limpiar datos</button>
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-success" onClick={handleSubmit(onSubmit)} type="submit">Guardar Estructura</button>
                                {errors?.lat?.type === "required" && <span className='eform'>Olvidaste Georeferenciar tu domicilio</span>}
                            </div>
                        </div>
                        <br></br>
                    </form> 
                </div>

                </div>
                    
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

export default Estructura;
