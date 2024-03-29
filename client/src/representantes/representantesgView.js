import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../assets/boxicons/css/boxicons.min.css'
import 'primeicons/primeicons.css';
import { useForm } from "react-hook-form";
import Header from '../header/header';
import { GoogleMap, LoadScript, Marker, } from '@react-google-maps/api';
import config from '../maps/config.json';

const mapContainerStyle = {
    width: '100%', height: '98vh', overflow: 'hidden'
};

const option = {

    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    clickableIcons: true,
    streetViewPanorama: true,

};





function RepresentantesgView() {
    const { id } = useParams();
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
    const [contacto, setContacto] = useState("");
    const [celContacto, setCelcontacto] = useState("");
    const [coordenadas, setCoordenadas] = useState([19.36313799880912
        , -101.81796480831713]);
    const [newCoordenadas, setNewCoor] = useState([])
    const [changeCenter, setChangeCenter] = useState(false);
    const [seccionInjerencia, setSeccionInjerencia] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [lider, setLider] = useState("");
    const [idSecc, setidSecc] = useState("");
    const [equipo, setEquipo] = useState("");
    const [consejo, setConsejo] = useState("");
    const [ruta, setRuta] = useState("");
    const [list, setList] = useState([])
    const [Cascont, setCascont] = useState([])
    const [Cascont10, setCascont10] = useState([])
    const [Casext, setCasext] = useState([])
    const [Casesp, setCasesp] = useState([])
    const navigate = useNavigate();
    const [menu1, setMenu1] = useState("");
    const [menu2C, setMenu2C] = useState("");
    const [menu2SMR, setMenu2SMR] = useState("");
    const [menu2E, setMenu2E] = useState("");

    const [menu3, setMenu3] = useState("");
    const [menu4, setMenu4] = useState("");
    const [check, setCheck] = useState("");

    const [selectedSeccion, setSelectedSeccion] = useState(null);
    const casillatipo = [
        { name: 'Básica', code: 'B' },
        { name: 'Contigua', code: 'C' },
        { name: 'Especial', code: 'SMR' },
        { name: 'Extraordinaria', code: 'E' },

    ];

    /*const center = {
      lat: document.getElementById("lat").value,
      lng:document.getElementById("lng").value
    };*/




    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };
    const onLoad = rectangle => {
        console.log('rectangle: ', rectangle.latLng.lat());
        console.log('rectangle: ', rectangle.latLng.lng());
        setValue("lat", rectangle.latLng.lat())
        setValue("lng", rectangle.latLng.lng())
        setNewCoor([rectangle.latLng.lat(), rectangle.latLng.lng()])
    }


    const getList = async (e) => {
       

        try {
            const res = await Axios.post(
                //"http://54.219.124.66:3001/uploadD",
                "http://localhost:3001/representantesg/detalles/"+id,
                
            );


            var fecha = res.data.fecha_nacimiento
            fecha = fecha.split("/").reverse().join("-");
            console.log(fecha)
            setValue("nombre", res.data.nombres, { shouldValidate: true, shouldDirty: true })

            setValue("apaterno", res.data.apaterno, { shouldValidate: true, shouldDirty: true });
            setValue("amaterno", res.data.amaterno, { shouldValidate: true, shouldDirty: true });
            setValue("calle", res.data.calle, { shouldValidate: true, shouldDirty: true });
            setValue("numero", res.data.numero, { shouldValidate: true, shouldDirty: true });
            setValue("colonia", res.data.colonia, { shouldValidate: true, shouldDirty: true });
            setValue("cpostal", res.data.cp, { shouldValidate: true, shouldDirty: true });
            setValue("ciudad", res.data.ciudad, { shouldValidate: true, shouldDirty: true });
            setValue("celectoral", res.data.c_elector, { shouldValidate: true, shouldDirty: true });
            setValue("curp", res.data.curp, { shouldValidate: true, shouldDirty: true });
            setValue("fnacimiento", fecha, { shouldValidate: true, shouldDirty: true });
            setValue("secc", res.data.seccion, { shouldValidate: true, shouldDirty: true });
            setValue("df", res.data.distrito_federal, { shouldValidate: true, shouldDirty: true });
            setValue("dl", res.data.distrito_local, { shouldValidate: true, shouldDirty: true });

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
        getList();
    }, []);

    const submitReview = () => {

        if (lider == 2) {
            if (menu1 == "B") {
                Axios.post(//"http://54.219.124.66:3001/api/insert",
                    "http://localhost:3001/api/insert-representantes",

                    {

                        apaterno: aPaterno, amaterno: aMaterno, nombres: nombres, calle: calle, numero: numero, colonia: colonia, cp: cp,
                        ciudad: ciudad, clave_elector: claveElectoral, curp: curp, fecha_nacimiento: fechaNacimiento, seccion: seccion, distrito_federal: document.getElementById("df").value,
                        distrito_local: document.getElementById("dl").value, nivel: nivel, no_celular: celular, email: email, facebook: facebook, twitter: twitter,
                        otra_red: otra, contacto: contacto, no_celcontacto: celContacto, lat: document.getElementById("lat").value, lng: document.getElementById("lng").value, id_Secc: idSecc, tiporep: lider, menu1: menu1, observaciones: observaciones
                    }

                ).then(() => {
                    console.log("succes")
                    //alert("AGREGADO")
                    navigate('/representantes-casilla')

                });
            }
            if (menu1 == "C") {

                Axios.post(//"http://54.219.124.66:3001/api/insert",
                    "http://localhost:3001/api/insert-representantes",

                    {

                        apaterno: aPaterno, amaterno: aMaterno, nombres: nombres, calle: calle, numero: numero, colonia: colonia, cp: cp,
                        ciudad: ciudad, clave_elector: claveElectoral, curp: curp, fecha_nacimiento: fechaNacimiento, seccion: seccion, distrito_federal: document.getElementById("df").value,
                        distrito_local: document.getElementById("dl").value, nivel: nivel, no_celular: celular, email: email, facebook: facebook, twitter: twitter,
                        otra_red: otra, contacto: contacto, no_celcontacto: celContacto, lat: document.getElementById("lat").value, lng: document.getElementById("lng").value, id_Secc: idSecc, tiporep: lider, menu1: menu1, menu2C: menu2C, observaciones: observaciones
                    }

                ).then(() => {
                    console.log("succes")
                    //alert("AGREGADO")
                    navigate('/representantes-casilla')

                });

            }
            if (menu1 == "SMR") {

                Axios.post(//"http://54.219.124.66:3001/api/insert",
                    "http://localhost:3001/api/insert-representantes",

                    {

                        apaterno: aPaterno, amaterno: aMaterno, nombres: nombres, calle: calle, numero: numero, colonia: colonia, cp: cp,
                        ciudad: ciudad, clave_elector: claveElectoral, curp: curp, fecha_nacimiento: fechaNacimiento, seccion: seccion, distrito_federal: document.getElementById("df").value,
                        distrito_local: document.getElementById("dl").value, nivel: nivel, no_celular: celular, email: email, facebook: facebook, twitter: twitter,
                        otra_red: otra, contacto: contacto, no_celcontacto: celContacto, lat: document.getElementById("lat").value, lng: document.getElementById("lng").value, id_Secc: idSecc, tiporep: lider, menu1: menu1, menu2SMR: menu2SMR, observaciones: observaciones
                    }

                ).then(() => {
                    console.log("succes")
                    //alert("AGREGADO")
                    navigate('/representantes-casilla')

                });

            }
            if (menu1 == "E" & menu3==" ") {

                Axios.post(//"http://54.219.124.66:3001/api/insert",
                    "http://localhost:3001/api/insert-representantes",

                    {

                        apaterno: aPaterno, amaterno: aMaterno, nombres: nombres, calle: calle, numero: numero, colonia: colonia, cp: cp,
                        ciudad: ciudad, clave_elector: claveElectoral, curp: curp, fecha_nacimiento: fechaNacimiento, seccion: seccion, distrito_federal: document.getElementById("df").value,
                        distrito_local: document.getElementById("dl").value, nivel: nivel, no_celular: celular, email: email, facebook: facebook, twitter: twitter,
                        otra_red: otra, contacto: contacto, no_celcontacto: celContacto, lat: document.getElementById("lat").value, lng: document.getElementById("lng").value, id_Secc: idSecc, tiporep: lider, menu1: menu1, menu2E: menu2E, observaciones: observaciones
                    }

                ).then(() => {
                    console.log("succes")
                    //alert("AGREGADO")
                    navigate('/representantes-casilla')

                });

            }
            if (menu1=="E" && menu3== "C") {

                Axios.post(//"http://54.219.124.66:3001/api/insert",
                    "http://localhost:3001/api/insert-representantes",

                    {

                        apaterno: aPaterno, amaterno: aMaterno, nombres: nombres, calle: calle, numero: numero, colonia: colonia, cp: cp,
                        ciudad: ciudad, clave_elector: claveElectoral, curp: curp, fecha_nacimiento: fechaNacimiento, seccion: seccion, distrito_federal: document.getElementById("df").value,
                        distrito_local: document.getElementById("dl").value, nivel: nivel, no_celular: celular, email: email, facebook: facebook, twitter: twitter,
                        otra_red: otra, contacto: contacto, no_celcontacto: celContacto, lat: document.getElementById("lat").value, lng: document.getElementById("lng").value, id_Secc: idSecc, tiporep: lider, menu1: "EC", menu2E: menu2E,menu3:menu3,menu4:menu4, observaciones: observaciones
                    }

                ).then(() => {
                    console.log("succes")
                    //alert("AGREGADO")
                    navigate('/representantes-casilla')

                });

            }

        }

        if(lider ==1){
            Axios.post(//"http://54.219.124.66:3001/api/insert",
                    "http://localhost:3001/api/insert-representantesg",

                    {

                        apaterno: aPaterno, amaterno: aMaterno, nombres: nombres, calle: calle, numero: numero, colonia: colonia, cp: cp,
                        ciudad: ciudad, clave_elector: claveElectoral, curp: curp, fecha_nacimiento: fechaNacimiento, seccion: seccion, distrito_federal: document.getElementById("df").value,
                        distrito_local: document.getElementById("dl").value, nivel: nivel, no_celular: celular, email: email, facebook: facebook, twitter: twitter,
                        otra_red: otra, contacto: contacto, no_celcontacto: celContacto, lat: document.getElementById("lat").value, lng: document.getElementById("lng").value, id_Secc: idSecc, tiporep: lider, injerencias:selectedSeccion,consejo:consejo,ruta:ruta, observaciones: observaciones
                    }

                ).then(() => {
                    console.log("succes")
                    //alert("AGREGADO")
                    navigate('/representantes-generales')

                });

        }



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

                console.log(res.data.df)

                setDfederal(res.data.df)
                setDlocal(res.data.dl)
                setidSecc(res.data.id)
                setValue("dl", res.data.dl, { shouldValidate: true, shouldDirty: true })
                setValue("df", res.data.df, { shouldValidate: true, shouldDirty: true })

                console.log(seccion)


            });

    }

    const getLocation = () => {
        var direccion = calle + " " + numero + ", " + colonia + ", " + cp + " " + ciudad
        document.getElementById("direc").setAttribute('value', direccion)
        Axios.post("http://localhost:3001/getLoc/", { direccion: document.getElementById("direc").value }).then((res) => {
            console.log(res)

            var lat = res.data.lat
            console.log(lat)
            var lng = res.data.lng
            console.log(lng)

            setNewCoor([lat, lng])
            setValue("lat", lat, { shouldValidate: true, shouldDirty: true })
            setValue("lng", lng, { shouldValidate: true, shouldDirty: true })

            setChangeCenter(true);


        })
    }
    const submitSecciones = () => {


        Axios.post("http://localhost:3001/api/distritosAll"
            /*"http://54.219.124.66:3001/api/distritos"*/, {

            }).then((response) => {
                var resultado = JSON.stringify(response.data);
                var empObj = JSON.parse(resultado);
                setList(empObj)


            });
    }
    const contiguas = () => {

        try {
            Axios.post("http://localhost:3001/api/cont/"
            /*"http://54.219.124.66:3001/api/distritos"*/, {

                }).then((response) => {
                    var resultado = JSON.stringify(response.data);
                    var empObj = JSON.parse(resultado);
                    setCascont(empObj)


                });
        } catch (e) {
            console.error(e);
        }
    }
    const contiguas10 = () => {

        try {
            Axios.post("http://localhost:3001/api/cont10/"
            /*"http://54.219.124.66:3001/api/distritos"*/, {

                }).then((response) => {
                    var resultado = JSON.stringify(response.data);
                    var empObj = JSON.parse(resultado);
                    setCascont10(empObj)


                });
        } catch (e) {
            console.error(e);
        }
    }
    const checkHandler = () => {
        setCheck(!check)
        console.log(check)
        setValue("menu3", "");
      }

    const handleReset = (e) => {
        e.preventDefault();
        console.log("Tipo" + e.target.value);
        setMenu1(e.target.value)
        if (e.target.value == "C") {
            setValue("menu2C", "");
        }
        setValue("menu2E", "");
        setValue("menu2SMR", "");
        setValue("menu3");
        setValue("menu4");
        setCheck(false);


        
        
       
    };



    const especiales = () => {
        try {
            Axios.post("http://localhost:3001/api/esp"
        /*"http://54.219.124.66:3001/api/distritos"*/, {

                }).then((response) => {
                    var resultado = JSON.stringify(response.data);
                    var empObj = JSON.parse(resultado);
                    setCasesp(empObj)


                });
        } catch (e) {
            console.error(e);
        }



    }

    const extraordinaria = () => {

        try {
            Axios.post("http://localhost:3001/api/ext"
        /*"http://54.219.124.66:3001/api/distritos"*/, {

                }).then((response) => {
                    var resultado = JSON.stringify(response.data);
                    var empObj = JSON.parse(resultado);
                    setCasext(empObj)


                });
        } catch (e) {
            console.error(e);
        }



    }
    /*
    
        useEffect(() => {
            contiguas()
            especiales()
            extraordinaria()
        }, [Cascont, Casesp, Casext]);
    
    */
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
    //const cb = document.querySelector('#check');



    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setFile();
    };
    const { register, handleSubmit, setValue, append, formState: { errors } } = useForm();

    const handleRegistration = (data) => console.log(data);
    const onSubmit = (data) => {

        alert(JSON.stringify(data));
        submitReview();
    }; // your form submit function which will invoke after successful validation



    return (
        <div>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
			<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
			<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous" />
			<link href="https://cdn.datatables.net/v/dt/dt-1.13.4/datatables.min.css" rel="stylesheet" />
			<script src="https://cdn.datatables.net/v/dt/dt-1.13.4/datatables.min.js"></script>

            <Header></Header>


            <div className="row">
                <div className="col-5" >
                    <div className="card ">
                        <div className="card-header text-center text-center text-white font-weight-bold">MODIFICAR REGISTRO DE REPRESENTANTE GENERAL</div>
                        <div className="card-body rounded-3  text-center bg-light">

                            <form onSubmit={handleSubmit(handleRegistration)}>

                                <br></br> <br></br>
                                

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
                                    <div className=" col-md-12">
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
                                    <div className="col-1">
                                    </div>


                                </div>
                                <div className='row'>
                                    <div className='col-2'></div>
                                    <div className='col-8'>
                                        <button className="btn btn-dark btn-md cargar" onClick={getLocation} type="button">Georeferenciar</button>
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
                                                //    required: true,
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
                                            //  required: true,
                                            //pattern: /^[A-Za-z.\s_-]+$/
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
                                            //    required: true,
                                            //  pattern: /^[A-Za-z.\s_-]+$/
                                            //})}

                                            className="form-control"
                                            id="tw"
                                            name="tw"
                                            placeholder=""
                                            onChange={e => { setTwitter(e.target.value) }} />

                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <label htmlFor="otrared">Otra red social</label>
                                            <input
                                                 {...register("otrared", {
                                                    
                                                   pattern: /^[A-Za-z.\s_-]+$/
                                                })}

                                                className="form-control"
                                                id="otrared"
                                                name="otrared"
                                                placeholder=""
                                                onChange={e => { setOtra(e.target.value) }} />

                                        </div></div>
                                    <div className='col-6'>
                                        <label className="small mb-1" htmlFor="nivel">Circulo</label>
                                        <select
                                            {...register("nivel", {
                                            //    required: true,

                                            })}
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
                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label htmlFor="otrared">Contacto a través de:</label>
                                        <input
                                            {...register("contacto", {
                                            //    required: true,
                                            //    pattern: /^[A-Za-z.\s_-]+$/
                                            })}

                                            className="form-control"
                                            id="contacto"
                                            name="contacto"
                                            placeholder=""
                                            onChange={e => { setContacto(e.target.value) }} />

                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="otrared">No. Celular del contacto</label>
                                        <input
                                            {...register("nocontacto", {
                                            //    required: true,
                                            //    pattern: /^(0|[1-9]\d*)(\.\d+)?$/
                                            })}

                                            className="form-control"
                                            id="nocontacto"
                                            name="nocontacto"
                                            placeholder=""
                                            onChange={e => { setCelcontacto(e.target.value) }} />

                                    </div>
                                </div>
                                <hr id="division"></hr>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-12">
                                        <label htmlFor="tipoapoyo">Tipo de Representante</label>
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <input
                                            {...register("tipolider", {
                                                required: true,

                                            })}
                                            type="radio"
                                            className="form-radio"
                                            id="tipolider"
                                            name="tipolider"
                                            value="1"
                                            onChange={e => { setLider(e.target.value); console.log(e.target.value) }}
                                        />General


                                    </div>

                                    <div className="col-md-6">
                                        <input
                                            {...register("tipolider", {
                                                required: true,

                                            })}
                                            type="radio"
                                            className="form-radio"
                                            id="tipolider"
                                            name="tipolider"
                                            value="2"
                                            onChange={e => { setLider(e.target.value); console.log(e.target.value) }}
                                        /> De casilla


                                    </div>

                                </div>
                                {
                                    (() => {
                                        switch (lider) {

                                            case ("1"): {
                                                return (
                                                    <div>

                                                        <div className="row gx-3 mb-3">

                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="nivel">Consejo Distrital</label>
                                                                <select
                                                                    {...register("consejo", {
                                                                        required: true,

                                                                    })}
                                                                    className="form-select"
                                                                    id="consejo"

                                                                    name="consejo"
                                                                    onChange={e => { setConsejo(e.target.value) }}
                                                                >
                                                                    <option value=""></option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>

                                                                </select>
                                                                {errors?.consejo?.type === "required" && <span className='eform'>Campo Vacio</span>}
                                                            </div>


                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="nivel">Ruta</label>
                                                                <select
                                                                    {...register("ruta", {
                                                                        required: true,

                                                                    })}
                                                                    className="form-select"
                                                                    id="ruta"

                                                                    name="ruta"
                                                                    onChange={e => { setRuta(e.target.value) }}
                                                                >
                                                                    <option value=""></option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>

                                                                </select>
                                                                {errors?.ruta?.type === "required" && <span className='eform'>Campo Vacio</span>}
                                                            </div>

                                                        </div>
                                                        <div className="row gx-3 mb-3">
                                                            <div className='col-md-12'>
                                                                <label className="small mb-1" htmlFor="nivel">Sección(es) de Responsabilidad</label>
                                                                {submitSecciones()}
                                                                <MultiSelect

                                                                    value={selectedSeccion}
                                                                    onChange={(e) => setSelectedSeccion(e.value)}
                                                                    options={list} optionLabel="name"
                                                                    filter placeholder="Selecciona una o más secciones" className="w-full md:w-20rem form-select" required />

                                                                {errors?.seccInjerencia?.type === "required" && <span className='eform'>Selecciona una opción válida</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                                break;

                                            case ("2"): {
                                                return (

                                                    /*<div>
                                                        <div className="row gx-3 mb-3">
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="nivel">Consejo Distrital</label>
                                                                <select
                                                                    {...register("consejo", {
                                                                        required: true,

                                                                    })}
                                                                    className="form-select"
                                                                    id="consejo"

                                                                    name="consejo"
                                                                    onChange={e => { setConsejo(e.target.value) }}
                                                                >
                                                                    <option value=""></option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>

                                                                </select>
                                                                {errors?.consejo?.type === "required" && <span className='eform'>Campo Vacio</span>}
                                                            </div>


                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="nivel">Cargo</label>
                                                                <select
                                                                    {...register("cargo", {
                                                                        required: true,

                                                                    })}
                                                                    className="form-select"
                                                                    id="cargo"

                                                                    name="cargo"
                                                                    onChange={e => { setCargo(e.target.value) }}
                                                                >
                                                                    <option value=""></option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>

                                                                </select>
                                                                {errors?.ruta?.type === "required" && <span className='eform'>Campo Vacio</span>}
                                                            </div>

                                                        </div>
                                                        <div className="row gx-3 mb-3">
                                                            <div className='col-md-6'>
                                                                <label className="small mb-1" htmlFor="nivel">Sección</label>
                                                                {submitSecciones()}
                                                                <MultiSelect
                                                                    maxSelectedLabels={1}
                                                                    value={seccionInjerencia}
                                                                    onChange={(e) => setSeccion(e.value)}
                                                                    options={list} optionLabel="name"
                                                                    filter placeholder="Selecciona una sección" className="w-full md:w-20rem form-select" required />

                                                                {errors?.seccInjerencia?.type === "required" && <span className='eform'>Selecciona una opción válida</span>}
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="nivel">Tipo y número de casilla</label>
                                                                <select
                                                                    {...register("consejo", {
                                                                        required: true,

                                                                    })}
                                                                    className="form-select"
                                                                    id="consejo"

                                                                    name="consejo"
                                                                    onChange={e => { setConsejo(e.target.value) }}
                                                                >
                                                                    <option value=""></option>
                                                                    <option value="1">Básica</option>
                                                                    <option value="2">Contigua 1</option>
                                                                    <option value="3">Extraordinaria 1</option>
                                                                    <option value="4">Especial</option>

                                                                </select>
                                                                {errors?.consejo?.type === "required" && <span className='eform'>Campo Vacio</span>}
                                                            </div>
                                                        </div>
                                                    </div>*/
                                                    <div>

                                                        <div className="row gx-3 mb-3">

                                                            <div className="col-md-6">
                                                                <label className="small mb-1" htmlFor="nivel">Menú 1</label>
                                                                <select id='menu1'
                                                                    {...register("menu1", {
                                                                        required: true,

                                                                    })}
                                                                    className="form-control form-select"

                                                                    onChange={handleReset}
                                                                >
                                                                    <option value=""></option>
                                                                    <option value="B">Básica</option>
                                                                    <option value="C">Contigua</option>
                                                                    <option value="SMR">Especial</option>
                                                                    <option value="E">Extraordinaria</option>

                                                                </select>
                                                                {errors?.tipocasilla?.type === "required" && <span className='eform'>Campo Vacio</span>}


                                                            </div>
                                                            <div className="col-md-6">

                                                                {

                                                                    (() => {
                                                                        switch (menu1) {

                                                                            case ("B"): {
                                                                                return (
                                                                                    <div>
                                                                                        <span></span>

                                                                                    </div>
                                                                                );
                                                                            }
                                                                                break;
                                                                            case ("C"): {



                                                                                return (
                                                                                    <div>


                                                                                        <label className="small mb-1" htmlFor="nivel">Menú 2</label>

                                                                                        <select id='menu2'
                                                                                            {...register("menu2C", {
                                                                                                required: true,

                                                                                            })}
                                                                                            className="form-control form-select"


                                                                                            onChange={e => { setMenu2C(e.target.value); console.log(e.target.value) }}
                                                                                        >
                                                                                            {contiguas()}
                                                                                            <option value=" " defaultValue>Selecciona una opción</option>
                                                                                            {
                                                                                                Cascont.map(val => {

                                                                                                    return (<option value={val.numero}>{val.numero}</option>);
                                                                                                })}


                                                                                        </select>
                                                                                        {errors?.menu2?.type === "required" && <span className='eform'>Campo Vacio</span>}



                                                                                    </div>
                                                                                )


                                                                            }
                                                                            case ("SMR"): {
                                                                                return (

                                                                                    <div>


                                                                                        <label className="small mb-1" htmlFor="nivel">Menú 2</label>

                                                                                        <select
                                                                                            {...register("menu2SMR", {
                                                                                                required: true,


                                                                                            })}
                                                                                            className="form-control form-select"

                                                                                            onChange={e => { setMenu2SMR(e.target.value); console.log(e.target.value) }}
                                                                                        >
                                                                                            {especiales()}
                                                                                            <option value=" " defaultValue>Selecciona una opción</option>
                                                                                            {
                                                                                                Casesp.map(val => {

                                                                                                    return (<option value={val.numero}>{val.numero}</option>);
                                                                                                })}


                                                                                        </select>
                                                                                        {errors?.menu2?.type === "required" && <span className='eform'>Campo Vacio</span>}



                                                                                    </div>
                                                                                )
                                                                            }
                                                                            case ("E"): {
                                                                                return (
                                                                                    <div>


                                                                                        <label className="small mb-1" htmlFor="nivel">Menú 2</label>

                                                                                        <select id='menu2'
                                                                                            {...register("menu2E", {
                                                                                                required: true,

                                                                                            })}
                                                                                            className="form-control form-select"

                                                                                            onChange={e => { setMenu2E(e.target.value); console.log(e.target.value) }}
                                                                                        >
                                                                                            {extraordinaria()}
                                                                                            <option value=" ">Selecciona una opción</option>
                                                                                            {
                                                                                                Casext.map(val => {

                                                                                                    return (<option value={val.numero}>{val.numero}</option>);
                                                                                                })}


                                                                                        </select>
                                                                                        {errors?.menu2?.type === "required" && <span className='eform'>Campo Vacio</span>}



                                                                                    </div>
                                                                                )
                                                                            }




                                                                            default: {
                                                                                return (
                                                                                    <span></span>
                                                                                )
                                                                            }

                                                                        }
                                                                    })()
                                                                }
                                                            </div>

                                                            <div className="col-md-5">
                                                                {
                                                                    (() => {
                                                                        switch (menu1) {

                                                                            case ("B"): {
                                                                                return (
                                                                                    <div>

                                                                                        <span></span>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                                break;
                                                                            case ("C"): {
                                                                                return (
                                                                                    <div>

                                                                                        <label className="small mb-1" htmlFor="nivel">Menú 3</label>

                                                                                        <select id='menu3'

                                                                                            className="form-control form-select"

                                                                                            onChange={e => { setConsejo(e.target.value) }}
                                                                                            disabled
                                                                                        >


                                                                                        </select>
                                                                                        {errors?.menu?.type === "required" && <span className='eform'>Campo Vacio</span>}



                                                                                    </div>
                                                                                )
                                                                            }
                                                                            case ("SMR"): {
                                                                                return (
                                                                                    <div>

                                                                                        <label className="small mb-1" htmlFor="nivel">Menú 3</label>

                                                                                        <select id='menu3'

                                                                                            className="form-control form-select"

                                                                                            onChange={e => { setConsejo(e.target.value) }}
                                                                                            disabled
                                                                                        >
                                                                                            <option value=""></option>
                                                                                            {
                                                                                                Cascont.map(val => {

                                                                                                    return (<option value={val.numero}>{val.numero}</option>);
                                                                                                })}


                                                                                        </select>
                                                                                        {errors?.menu3?.type === "required" && <span className='eform'>Campo Vacio</span>}

                                                                                    </div>
                                                                                )
                                                                            }
                                                                            case ("E"): {
                                                                                if (check) {
                                                                                    return (
                                                                                        <div>
                                                                                            {extraordinaria()}
                                                                                            <label className="small mb-1" htmlFor="nivel">Menú 3</label>

                                                                                            <select id='menu3'
                                                                                                {...register("menu3", {
                                                                                                    required: true,

                                                                                                })}
                                                                                                className="form-control form-select"

                                                                                                onChange={e => { setMenu3(e.target.value) }}

                                                                                            >
                                                                                                <option value="C">Contigua</option>


                                                                                            </select>
                                                                                            {errors?.menu3?.type === "required" && <span className='eform'>Campo Vacio</span>}


                                                                                        </div>
                                                                                    )
                                                                                } else {
                                                                                    return (
                                                                                        <div>
                                                                                            <label className="small mb-1" htmlFor="nivel">Menú 3</label>

                                                                                            <select id='menu3'

                                                                                                className="form-control form-select"

                                                                                                onChange={e => { setMenu3(e.target.value) }}
                                                                                                disabled
                                                                                            >
                                                                                                <option value=""></option>
                                                                                                {
                                                                                                    Casext.map(val => {

                                                                                                        return (<option value={val.numero}>{val.numero}</option>);
                                                                                                    })}


                                                                                            </select>
                                                                                            {errors?.menu3?.type === "required" && <span className='eform'>Campo Vacio</span>}


                                                                                        </div>
                                                                                    )
                                                                                }

                                                                            }




                                                                            default: {
                                                                                return (
                                                                                    <span></span>
                                                                                )
                                                                            }

                                                                        }
                                                                    })()
                                                                }

                                                            </div>
                                                            <div className="col-md-5">

                                                                {
                                                                    (() => {
                                                                        switch (menu1) {

                                                                            case ("B"): {
                                                                                return (
                                                                                    <div>


                                                                                    </div>
                                                                                );
                                                                            }
                                                                                break;
                                                                            case ("C"): {
                                                                                return (
                                                                                    <div>

                                                                                        <label className="small mb-1" htmlFor="nivel">Menú 4</label>

                                                                                        <select id='menu3'

                                                                                            className="form-control form-select"

                                                                                            onChange={e => { setConsejo(e.target.value) }}
                                                                                            disabled
                                                                                        >


                                                                                        </select>
                                                                                        {errors?.menu?.type === "required" && <span className='eform'>Campo Vacio</span>}



                                                                                    </div>
                                                                                )
                                                                            }
                                                                            case ("SMR"): {
                                                                                return (
                                                                                    <div>

                                                                                        <label className="small mb-1" htmlFor="nivel">Menú 4</label>
                                                                                        <select id='menu3'

                                                                                            className="form-control form-select"

                                                                                            onChange={e => { setConsejo(e.target.value) }}
                                                                                            disabled
                                                                                        >



                                                                                        </select>
                                                                                        {errors?.menu?.type === "required" && <span className='eform'>Campo Vacio</span>}

                                                                                    </div>
                                                                                )
                                                                            }
                                                                            case ("E"): {
                                                                                if (check) {
                                                                                    return (
                                                                                        <div>


                                                                                            <label className="small mb-1" htmlFor="nivel">Menú 4</label>
                                                                                        {contiguas10()}
                                                                                            <select id='menu4'
                                                                                                {...register("menu4", {
                                                                                                    required: true,

                                                                                                })}
                                                                                                className="form-control form-select"

                                                                                                onChange={e => { setMenu4(e.target.value); console.log(e.target.value) }}
                                                                                            >
                                                                                                <option value="Selecciona"></option>
                                                                                                {
                                                                                                    Cascont10.map(val => {

                                                                                                        return (<option value={val.numero}>{val.numero}</option>);
                                                                                                    })}


                                                                                            </select>
                                                                                            {errors?.menu4?.type === "required" && <span className='eform'>Campo Vacio</span>}



                                                                                        </div>
                                                                                    )
                                                                                } else {
                                                                                    return (
                                                                                        <div>


                                                                                            <label className="small mb-1" htmlFor="nivel">Menú 4</label>

                                                                                            <select id='menu4'

                                                                                                className="form-control form-select"
                                                                                                disabled
                                                                                                onChange={e => { setMenu4(e.target.value); console.log(e.target.value) }}
                                                                                            >


                                                                                            </select>
                                                                                            {errors?.menu?.type === "required" && <span className='eform'>Campo Vacio</span>}



                                                                                        </div>
                                                                                    )
                                                                                }

                                                                            }




                                                                            default: {
                                                                                return (
                                                                                    <span></span>
                                                                                )
                                                                            }

                                                                        }
                                                                    })()
                                                                }
                                                            </div>
                                                            <div className='col-md-2'>
                                                                {
                                                                    (() => {
                                                                        switch (menu1) {

                                                                            case ("B"): {
                                                                                return (
                                                                                    <div>


                                                                                    </div>
                                                                                );
                                                                            }
                                                                                break;
                                                                            case ("C"): {
                                                                                return (
                                                                                    <div>
                                                                                        <input id="check"  
                                                                                        type='checkbox' 
                                                                                        disabled></input>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            case ("SMR"): {
                                                                                return (
                                                                                    <div>
                                                                                        <input id="check" type='checkbox' disabled></input>

                                                                                    </div>
                                                                                )
                                                                            }
                                                                            case ("E"): {
                                                                                return (
                                                                                    <div>

                                                                                        <input id="check" checked={check} onChange={ checkHandler} type='checkbox'></input>



                                                                                    </div>
                                                                                )
                                                                            }




                                                                            default: {
                                                                                return (
                                                                                    <span></span>
                                                                                )
                                                                            }

                                                                        }
                                                                    })()
                                                                }

                                                            </div>





                                                        </div>

                                                    </div>

                                                )
                                            }

                                            default: {
                                                return (
                                                    <span></span>
                                                )
                                            }

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
                                        onChange={e => { setObservaciones(e.target.value) }} />

                                </div>

                                <div className="row gx-3 mb-3">

                                    <div className="col-md-2"></div>

                                    <div className="col-md-4">
                                        <button className="btn btn-danger" onClick={limpiar} type="button">Limpiar datos</button>
                                    </div>
                                    <div className="col-md-4">
                                        <button className="btn btn-success" onClick={handleSubmit(onSubmit)} type="submit"  >Guardar Representante</button>
                                        {errors?.lat?.type === "required" && <span className='eform'>Olvidaste Georeferenciar tu domicilio</span>}
                                    </div>
                                </div>
                                <br></br>

                            </form>
                        </div>

                    </div>
                </div>



                <div className="col-7" >

                    {changeCenter === false && (
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
                    {changeCenter === true && (
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

export default RepresentantesgView;
