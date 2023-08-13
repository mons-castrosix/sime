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
const center = {
    lat: 19.2130929078429,
    lng: -101.09697103412132
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

    const [año, setAño] = useState("");
    const [eleccion, setEleccion] = useState("");
    const [check, setCheck] = useState("");
    const [estado, setEstado] = useState("");
    const [df, setDF] = useState("");
    const [dl, setDL] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [seccion, setSeccion] = useState("");


    const [estadoInp, setEstadoinp] = useState("");
    const [dfInp, setDFinp] = useState("");
    const [dlInp, setDLinp] = useState("");
    const [municipioInp, setMunicipioInt] = useState("");
    const [seccionInp, setSeccioninp] = useState("");

    const [list, setList] = useState([])
    /*const center = {
      lat: document.getElementById("lat").value,
      lng:document.getElementById("lng").value
    };*/




    const submitSecciones = () => {


        Axios.post("http://localhost:3001/api/distritosAll"
            /*"http://54.219.124.66:3001/api/distritos"*/, {

            }).then((response) => {
                var resultado = JSON.stringify(response.data);
                var empObj = JSON.parse(resultado);
                setList(empObj)


            });
    }


    const checkHandler = () => {
        setCheck(!check)
        console.log(check)
        //setValue("menu3", "");
    }

    const handleReset = (e) => {
        e.preventDefault();

        setCheck(false);





    };






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

                                        type="radio"
                                        className="form-radio"
                                        id="tipolider"
                                        name="tipolider"
                                        value="2"
                                        onChange={e => { setAño(e.target.value); console.log(e.target.value) }}
                                    /> 2021 <br></br>
                                    <input

                                        type="radio"
                                        className="form-radio"
                                        id="tipolider"
                                        name="tipolider"
                                        value="2"
                                        onChange={e => { setAño(e.target.value); console.log(e.target.value) }}
                                    /> 2018<br></br>
                                    <input

                                        type="radio"
                                        className="form-radio"
                                        id="tipolider"
                                        name="tipolider"
                                        value="2"
                                        onChange={e => { setAño(e.target.value); console.log(e.target.value) }}
                                    /> 2015 <br></br>

                                </div>
                                <div className='col-md-6'>
                                    <h5>Tipo de elección</h5>
                                    <input

                                        type="radio"
                                        className="form-radio"
                                        id="tipolider"
                                        name="tipolider"
                                        value="2"
                                        onChange={e => { setEleccion(e.target.value); console.log(e.target.value) }}
                                    /> Gobernador <br></br>
                                    <input

                                        type="radio"
                                        className="form-radio"
                                        id="tipolider"
                                        name="tipolider"
                                        value="2"
                                        onChange={e => { setEleccion(e.target.value); console.log(e.target.value) }}
                                    /> Diputado Federal<br></br>
                                    <input

                                        type="radio"
                                        className="form-radio"
                                        id="tipolider"
                                        name="tipolider"
                                        value="2"
                                        onChange={e => { setEleccion(e.target.value); console.log(e.target.value) }}
                                    /> Diputado Local<br></br>
                                    <input

                                        type="radio"
                                        className="form-radio"
                                        id="tipolider"
                                        name="tipolider"
                                        value="2"
                                        onChange={e => { setEleccion(e.target.value); console.log(e.target.value) }}
                                    /> Ayuntamiento<br></br>
                                </div>
                            </div>
                            <br></br>
                            <div className='row'>
                                <h5 className='text-center'>Territorio</h5>
                                <div className='col-md-12'>
                                    <div class="form-group row">
                                        <div className='col-md-6'>
                                        
                                            <input

                                                type="radio"
                                                className="form-radio"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setEstado(e.target.value); console.log(e.target.value) }}
                                            /> Estado <br/><br/>
                                            <input

                                                type="radio"
                                                className="form-radio"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setDF(e.target.value); console.log(e.target.value) }}
                                            /> Distrito Fed.<br/><br/>
                                            <input

                                                type="radio"
                                                className="form-radio"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setDL(e.target.value); console.log(e.target.value) }}
                                            />Distrito Loc. <br/><br/>
                                            <input

                                                type="radio"
                                                className="form-radio"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setMunicipio(e.target.value); console.log(e.target.value) }}
                                            />Municipio <br/><br/>
                                            <input

                                                type="radio"
                                                className="form-radio"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setSeccion(e.target.value); console.log(e.target.value) }}
                                            />Sección<br></br>

                                        </div>

                                        <div className='col-md-6'>
                                            <input

                                                type="text"
                                                className="form-radio form-control"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setEstado(e.target.value); console.log(e.target.value) }}
                                            /> 
                                            <input

                                                type="select"
                                                className="form-radio form-select"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setDF(e.target.value); console.log(e.target.value) }}
                                            /> 
                                            <input

                                                type="select"
                                                className="form-radio form-select"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setDL(e.target.value); console.log(e.target.value) }}
                                            />
                                            <input

                                                type="select"
                                                className="form-radio form-select"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setMunicipio(e.target.value); console.log(e.target.value) }}
                                            /> 
                                            <input

                                                type="select"
                                                className="form-radio form-select"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setSeccion(e.target.value); console.log(e.target.value) }}
                                            />

                                        </div>



                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>



                <div className="col-7" >



                    <LoadScript googleMapsApiKey={config.GOOGLE_MAP_API_KEY}>
                        <GoogleMap
                            id="rectangle-example"
                            mapContainerStyle={mapContainerStyle}
                            zoom={8}
                            center={center}
                            options={option}



                        >




                        </GoogleMap>
                    </LoadScript>



                </div>
            </div>
        </div>






    );
}

export default Resultados;
