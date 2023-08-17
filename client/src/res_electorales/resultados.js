import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import Axios from 'axios';
import './relect.css'
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
    const [list2, setList2] = useState([])
  


    const [pan, setPan] = useState("");
    const [pri, setPri] = useState("");
    const [prd, setPrd] = useState("");
    const [pt, setPt] = useState("");
    const [ln, setLn] = useState("");
    const [part, setPart] = useState("");
    const [pvem, setPvem] = useState("");
    const [morena, setMorena] = useState("");
    const [mc, setMc] = useState("");
    const [pes, setPes] = useState("");
    const [casilla, setCasilla] = useState("");
    /*const center = {
      lat: document.getElementById("lat").value,
      lng:document.getElementById("lng").value
    };*/




    const distF = () => {


        Axios.post("http://localhost:3001/ayuntamiento-df/"
            /*"http://54.219.124.66:3001/api/distritos"*/, {

            }).then((response) => {
                var resultado = JSON.stringify(response.data);
                var empObj = JSON.parse(resultado);
                setList(empObj)


            });
    }

    const seccList = () => {


        Axios.post("http://localhost:3001/ayuntamiento-secc/"
            /*"http://54.219.124.66:3001/api/distritos"*/, {

            }).then((response) => {
                var resultado = JSON.stringify(response.data);
                var empObj = JSON.parse(resultado);
                setList2(empObj)


            });
    }

    const resultados = () => {
        if(año== "2015"){
            Axios.post("http://localhost:3001/ress-view/"
            /*"http://54.219.124.66:3001/api/distritos"*/,{anio:año,eleccion:eleccion,estado:estadoInp,df:dfInp,dl:dlInp,municipio:municipioInp,seccion:seccionInp}, {

            }).then((res) => {
                console.log(res.data)
                setCasilla(res.data.cas);
                setPan(res.data.pan15);
                setPri(res.data.pri15);
                setPrd(res.data.prd15);
                setPt(res.data.pt15);
                setPvem(res.data.pvem15);
                setMorena(res.data.morena15);
                setPes(res.data.pes15);
                setLn(res.data.ln15);
                setPart(res.data.part15);
                setMc(res.data.mc15);


            });
        }
        if(año== "2018"){
            Axios.post("http://localhost:3001/ress-view/"
            /*"http://54.219.124.66:3001/api/distritos"*/,{anio:año,eleccion:eleccion,estado:estadoInp,df:dfInp,dl:dlInp,municipio:municipioInp,seccion:seccionInp}, {

            }).then((res) => {
                console.log(res.data)
                setCasilla(res.data.cas);
                setPan(res.data.pan18);
                setPri(res.data.pri18);
                setPrd(res.data.prd18);
                setPt(res.data.pt18);
                setPvem(res.data.pvem18);
                setMorena(res.data.morena18);
                setPes(res.data.pes18);
                setLn(res.data.ln18);
                setPart(res.data.part18);
                setMc(res.data.mc18);


            });
        }
        if(año== "2021"){
            Axios.post("http://localhost:3001/ress-view/"
            /*"http://54.219.124.66:3001/api/distritos"*/,{anio:año,eleccion:eleccion,estado:estadoInp,df:dfInp,dl:dlInp,municipio:municipioInp,seccion:seccionInp}, {

            }).then((res) => {
                console.log(res.data)
                setCasilla(res.data.cas);
                setPan(res.data.pan21);
                setPri(res.data.pri21);
                setPrd(res.data.prd21);
                setPt(res.data.pt21);
                setPvem(res.data.pvem21);
                setMorena(res.data.morena21);
                setPes(res.data.pes21);
                setLn(res.data.ln21);
                setPart(res.data.part21);
                setMc(res.data.mc21);


            });
        }
        
       
            
        
        
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
                                        className="form-radio anio"
                                        name="anio"
                                        value="2021"
                                        onChange={e => { setAño(e.target.value); console.log(e.target.value) }}
                                    /> 2021 <br></br>
                                    <input

                                        type="radio"
                                        className="form-radio anio"
                                        
                                        name="anio"
                                        value="2018"
                                        onChange={e => { setAño(e.target.value); console.log(e.target.value) }}
                                    /> 2018<br></br>
                                    <input

                                        type="radio"
                                        className="form-radio anio"
                                      
                                        name="anio"
                                        value="2015"
                                        onChange={e => { setAño(e.target.value); console.log(e.target.value) }}
                                    /> 2015 <br></br>

                                </div>
                                <div className='col-md-6'>
                                    <h5>Tipo de elección</h5>
                                    <input

                                        type="radio"
                                        className="form-radio elecc"
                                        name="elecc"
                                        value="1"
                                        onChange={e => { setEleccion(e.target.value); console.log(e.target.value) }}
                                    /> Gobernador <br></br>
                                    <input

                                        type="radio"
                                        className="form-radio elecc"
                                        id="tipolider"
                                        name="elecc"
                                        value="2"
                                        onChange={e => { setEleccion(e.target.value); console.log(e.target.value) }}
                                    /> Diputado Federal<br></br>
                                    <input

                                        type="radio"
                                        className="form-radio"
                                        name="elecc"
                                        value="3"
                                        onChange={e => { setEleccion(e.target.value); console.log(e.target.value) }}
                                    /> Diputado Local<br></br>
                                    <input

                                        type="radio"
                                        className="form-radio elecc"
                                        name="elecc"
                                        value="4"
                                        onChange={e => { setEleccion(e.target.value); console.log(e.target.value) }}
                                    /> Ayuntamiento<br></br>
                                </div>
                            </div>
                            <br></br>
                            <div className='row'>
                                <h5 className='text-center'>Territorio</h5>
                                <div className='col-md-12'>
                                    <div className="form-group row">
                                        <div className='col-md-6'>

                                            <input

                                                type="radio"
                                                className="form-radio"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setEstado(e.target.value); console.log(e.target.value) }}
                                            /> Estado <br /><br />
                                            <input

                                                type="radio"
                                                className="form-radio"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setDF(e.target.value); console.log(e.target.value) }}
                                            /> Distrito Fed.<br /><br />
                                            <input

                                                type="radio"
                                                className="form-radio"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setDL(e.target.value); console.log(e.target.value) }}
                                            />Distrito Loc. <br /><br />
                                            <input

                                                type="radio"
                                                className="form-radio"
                                                id="tipolider"
                                                name="tipolider"
                                                value="2"
                                                onChange={e => { setMunicipio(e.target.value); console.log(e.target.value) }}
                                            />Municipio <br /><br />
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

                                            <select


                                                className="form-select form-control"
                                                id="estadoinput"
                                                name="estadoinput"

                                                onChange={e => { setEstadoinp(e.target.value); console.log(e.target.value) }}
                                            >
                                                <option value="">Selecciona</option>
                                                <option value="1">Michoacán</option>
                                            </select>
                                            <select


                                                className="form-select form-control"
                                                id="dfinput"
                                                name="dfinput"

                                                onChange={e => { setDFinp(e.target.value); console.log(e.target.value) }}
                                            >
                                                <option value="">Selecciona</option>
                                                <option value="1">21</option>

                                            </select>
                                            <select


                                                className="form-select form-control"
                                                id="dlinput"
                                                name="dlinput"

                                                onChange={e => { setDLinp(e.target.value); console.log(e.target.value) }}
                                            >
                                                <option value="">Selecciona</option>
                                                {distF()}
                                                {
                                                    list.map(val => {

                                                        return (<option value={val.dl}>{val.dl}</option>);
                                                    })}

                                            </select>
                                            <select


                                                className="form-select form-control"
                                                id="muninput"
                                                name="muninput"

                                                onChange={e => { setMunicipioInt(e.target.value); console.log(e.target.value) }}
                                            >
                                                <option value="">Selecciona</option>
                                                <option value="morelia">Morelia</option>

                                            </select>
                                            <select


                                                className="form-select form-control"
                                                id="seccinp"
                                                name="seccinp"

                                                onChange={e => { setSeccioninp(e.target.value); console.log(e.target.value) }}
                                            >
                                                <option value="">Selecciona</option>
                                                {seccList()}
                                                {
                                                    list2.map(val => {

                                                        return (<option value={val.secc}>{val.secc}</option>);
                                                    })}


                                            </select>

                                        </div>



                                    </div>

                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-md-4'></div>
                                <div className='col-md-4'>
                                    <button className='btn btn-primary' onClick={resultados}>Resultados</button>
                                </div>
                                <div className='col-md-4'></div>
                            </div> <br></br>
                                                    

                            <div className='row'>
                                
                                <div className='col-md-6'>
                                    <form className="form-inline" >
                                        <div className="form-group">
                                            <label >PAN: </label>
                                            <input type="text" readOnly className="form-control col-md-5" id="pan" value={pan} />
                                        </div>
                                        <div className="form-group">
                                            <label > PRI  : </label>
                                            <input type="text" readOnly className="form-control col-md-5" id="pri" value={pri} />
                                        </div>
                                        <div className="form-group">
                                            <label>PRD:</label>
                                            <input type="text" readOnly className="form-control col-md-5" id="prd" value={prd || ""} />
                                        </div>
                                       
                                        <div className="form-group">
                                            <label>PT  :</label>
                                            <input type="text" readOnly className="form-control col-md-5" id="pt" value={pt || ""} />
                                        </div>
                                        <div className="form-group">
                                            <label >LN :</label>
                                            <input type="text" readOnly className="form-control col-md-5" id="ln" value={ln || ""} />
                                        </div>
                                        <div className="form-group">
                                            <label >PART:</label>
                                            <input type="text" readOnly className="form-control col-md-5" id="part" value={part || ""} />
                                        </div>

                                    </form>
                                </div>
                                
                                <div className='col-md-6'>
                                    <form className="form-inline" >
                                        <div className="form-group">
                                            <label className='' >PVEM:</label>
                                            <input type="text" readOnly className="form-control col-md-5" id="pvem" value={pvem || ""} />
                                        </div>
                                        <div className="form-group">
                                            <label >MORENA:</label>
                                            <input type="text" readOnly className="form-control col-md-5" id="morena" value={morena || ""} />
                                        </div>
                                        <div className="form-group">
                                            <label >MC:</label>
                                            <input type="text" readOnly className="form-control col-md-5" id="mc" value={mc || ""} />
                                        </div>
                                        <div className="form-group">
                                            <label >PES:</label>
                                            <input type="text" readOnly className="form-control col-md-5" id="pes" value={pes || ""} />
                                        </div>
                                        <div className="form-group">
                                            <label >No. Casilla:</label>
                                            <input type="text" readOnly className="form-control col-md-5" id="ncas" value={casilla || ""} />
                                        </div>

                                    </form>
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
