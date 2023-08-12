import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import Axios from 'axios';

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





function Resultados() {
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
    /*useEffect(() => {
        console.log(nombres);
        console.log(aPaterno);
    }, [nombres, aPaterno, aMaterno, calle, numero, colonia, cp, ciudad, fechaNacimiento, seccion, dFederal, dLocal]);*/

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
                        <div className="card-header text-center text-center text-white font-weight-bold">RESULTADOS ELECTORALES</div>
                        <div className="card-body rounded-3  text-center bg-light">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <h5>Año de la elección</h5>
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
                                        /> 2021 <br></br>
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
                                        /> 2018<br></br>
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
                                        /> 2015 <br></br>

                                </div>
                                <div className='col-md-6'>
                                    <h5>Tipo de elección</h5>
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
                                        /> Gobernador <br></br>
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
                                        /> Diputado Federal<br></br>
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
                                        /> Diputado Local<br></br>
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
                                        /> Ayuntamiento<br></br>
                                </div>
                            </div>
                           
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

export default Resultados;
