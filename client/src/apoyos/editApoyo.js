import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment'
  
function EditApp() {
  const navigate=useNavigate();
  const {id}=useParams();
  const [aPaterno,setApaterno]= useState('');
  const [aMaterno,setAmaterno]=useState(null);
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
  const [celular, setCelular]=useState('');
  const [email, setEmail]=useState('');
  const [facebook, setFacebook]=useState('');
  const [twitter, setTwitter]=useState('');
  const [otra, setOtra]=useState('');
  const [descrApoyo, setDescapoyo]=useState('');
  const [monto, setMonto]=useState(0);
  const [contacto, setContacto]=useState('');
  const [celContacto, setCelcontacto]=useState('');
  const [list,setList]=useState([])
  const [nivel,setNivel]=useState(0);
  const [alcance, setAlcance]=useState('');
  const [tipoApoyo, setTipoapoyo]=useState('');
  const getList=()=>{
    Axios.post("http://localhost:3001/apoyoId",{id:id}
    //"http://54.219.124.66:3001/apoyos"
    ).then((response) =>{
      setList(response.data)
      //console.log(list)
      document.getElementById("amaterno").setAttribute('value',list[0].amaterno)
      document.getElementById("apaterno").setAttribute('value',list[0].apaterno)
      document.getElementById("nombre").setAttribute('value',list[0].nombres)
      document.getElementById("calle").setAttribute('value',list[0].calle)
      document.getElementById("numero").setAttribute('value',list[0].numero)
      document.getElementById("colonia").setAttribute('value',list[0].colonia)
      document.getElementById("cpostal").setAttribute('value',list[0].cp)
      document.getElementById("ciudad").setAttribute('value',list[0].ciudad)
      document.getElementById("celectoral").setAttribute('value',list[0].clave_elector)
      document.getElementById("curp").setAttribute('value',list[0].curp)
      var fecha= list[0].fecha_nacimiento
      var f=moment(fecha).utc().format('MM/DD/YYYY')
      //console.log(f)
      
      document.getElementById("fnacimiento").setAttribute('value',f)
      document.getElementById("dfederal").setAttribute('value',list[0].distrito_federal)
      document.getElementById("dlocal").setAttribute('value',list[0].distrito_local)
      document.getElementById("nivel").selectedIndex= list[0].nivel //select
      document.getElementById("ncelular").setAttribute('value',list[0].no_celular)
      document.getElementById("secc").setAttribute('value',list[0].seccion)
      document.getElementById("email").setAttribute('value',list[0].email)
      document.getElementById("facebook").setAttribute('value',list[0].facebook)
      document.getElementById("twitter").setAttribute('value',list[0].twitter)
      document.getElementById("ncelular").setAttribute('value',list[0].no_celular)
      document.getElementById("otrared").setAttribute('value',list[0].otra_red)
      document.getElementById("descapoyo").setAttribute('value',list[0].descripcion)
      
      if(list[0].alcance =='Personal'){
        document.getElementById("alcanceapoyo").selectedIndex= 1
        setAlcance(document.getElementById("alcanceapoyo").value)
      }else{
        if(list[0].alcance =='Familiar'){
            document.getElementById("alcanceapoyo").selectedIndex= 2
            setAlcance(document.getElementById("alcanceapoyo").value)
        }
        if(list[0].alcance=='Comunitario'){
            document.getElementById("alcanceapoyo").selectedIndex= 3
            setAlcance(document.getElementById("alcanceapoyo").value)
        }
      }

      if(list[0].tipo == 'Económico'){
        document.getElementById("tipoapoyo").selectedIndex= 1
        setTipoapoyo(document.getElementById("tipoapoyo").value)
      }
      else{
        if(list[0].tipo == 'Especie'){
            document.getElementById("tipoapoyo").selectedIndex= 2
        }
        if(list[0].tipo == 'Con terceros'){
            document.getElementById("tipoapoyo").selectedIndex= 3
        }
      }
      document.getElementById("monto").setAttribute('value',list[0].monto)
      document.getElementById("contacto").setAttribute('value',list[0].contacto)
      document.getElementById("celcontacto").setAttribute('value',list[0].no_celcontacto)
      setApaterno(document.getElementById("apaterno").value)
      
      setAmaterno(document.getElementById("amaterno").value)
      setNombres(document.getElementById("nombre").value)
      setCalle(document.getElementById("calle").value)
      setNivel(document.getElementById("nivel").selectedIndex= list[0].nivel)
      //setTipoapoyo(document.getElementById("tipoapoyo").selectedIndex= list[0].tipo)
     
      //setAlcance(document.getElementById("alcanceapoyo").selectedIndex=list[0].alcance)
      setTwitter(document.getElementById("twitter").value)
      setFacebook(document.getElementById("facebook").value)
      setNumero(document.getElementById("numero").value)
      setColonia(document.getElementById("colonia").value)
      setCp(document.getElementById("cpostal").value)
      setCiudad(document.getElementById("ciudad").value)
      setClave(document.getElementById("celectoral").value)
      setCurp(document.getElementById("curp").value)
      setFecha(document.getElementById("fnacimiento").value)
      setSeccion(document.getElementById("secc").value)
      setDfederal(document.getElementById("dfederal").value)
      setDlocal(document.getElementById("dlocal").value)
      setContacto(document.getElementById("contacto").value)
      setOtra(document.getElementById("otrared").value)
      setMonto(document.getElementById("monto").value)
      setCelcontacto(document.getElementById("celcontacto").value)
      setEmail(document.getElementById("email").value)
      setCelular(document.getElementById("ncelular").value)
      setDescapoyo(document.getElementById("descapoyo").value)

    });
  }
  const submitReview = () =>{
    console.log(facebook)

    Axios.put(//"http://54.219.124.66:3001/api/insert",
    "http://localhost:3001/apoyo/update/"+id,
    {
    apaterno:aPaterno,amaterno:aMaterno,nombres:nombres,calle:calle,numero:numero,colonia:colonia,cp:cp,
    ciudad:ciudad,clave_elector:claveElectoral,curp:curp,fecha_nacimiento:fecha,seccion:seccion,distrito_federal:dfederal,
    distrito_local:dLocal,nivel:nivel,no_celular:celular,email:email,facebook:facebook,twitter:twitter,
    otra_red:otra,descripcion_apoyo:descrApoyo,apoyo_tipo:tipoApoyo,monto_apoyo:monto,alcance_apoyo:alcance,contacto:contacto,
    no_celcontacto:celContacto
    }).then(() => {
      console.log("succes")
      alert("ACTUALIZADO")
      navigate('/apoyos')

    });
    
      
  }
  const atras = () =>{ 
    let path = '/apoyos'; 
    navigate(path);
  }

  
  
  return (
    <div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous"/>
       <div className="container-xl px-4 mt-4">
   
    <nav className="nav nav-borders">
        
    </nav>
    
    <div className="row">
        <div className="col-xl-12">
            
            <div className="card mb-4">
                <div className="card-header">Detalles</div>
                <div className="card-body">
                    <form onLoad={getList()}>
                        
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="nombre">Nombre (s)</label>
                            <input className="form-control" id="nombre" typnamee="text" name="nombre"  onChange={(event) =>{setNombres(event.target.value)}}/>
                        </div>
                       
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="apaterno">Apellido Paterno</label>
                                <input className="form-control" id="apaterno" type="text" name="apaterno"  onChange={(event) =>{setApaterno(event.target.value)}}/>
                            </div>
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="amaterno">Apellido Materno</label>
                                <input className="form-control" id="amaterno" name='amaterno' type="text"    onChange={(event) =>{setAmaterno(event.target.value)}} />
                            </div>
                        </div>
                       
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="calle">Calle</label>
                                <input className="form-control" id="calle" name='calle' type="text"  onChange={(event) =>{ setCalle(event.target.value)}} />
                            </div>
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="numero">No.</label>
                                <input className="form-control" id="numero" type="text" name='numero'  onChange={(event) =>{setNumero(event.target.value)}} />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="colonia">Colonia</label>
                                <input className="form-control" id="colonia" type="text" name='colonia'  onChange={(event) =>{setColonia(event.target.value)}} />
                            </div>
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="cp">CP</label>
                                <input className="form-control" id="cpostal" type="text" name='cpostal'  onChange={(event) =>{setCp(event.target.value)}} />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="ciudad">Ciudad</label>
                                <input className="form-control" id="ciudad" type="text" name='ciudad'  onChange={(event) =>{setCiudad(event.target.value)}} />
                            </div>
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="celectoral">Clave Electoral</label>
                                <input className="form-control" id="celectoral" type="text" name='celectoral'  onChange={(event) =>{setClave(event.target.value)}} />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                            <label className="small mb-1" htmlFor="descapoyo">CURP</label>
                            <input className="form-control" id="curp" name='curp' type="text"  onChange={(event) =>{setCurp(event.target.value)}} />
                            </div>
                            
                            <div className="col-md-6">
                            <label className="small mb-1" htmlFor="descapoyo">Fecha de Nacimiento</label>
                            <input className="form-control" id="fnacimiento" name='fnacimiento' type="text"  onChange={(event) =>{setCurp(event.target.value)}} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="otrared">Sección</label>
                            <input className="form-control" id="secc" name='secc' type="text"  onChange={(event) =>{setSeccion(event.target.value)}}/>
                        </div>
                       
                        
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-4">
                                <label className="small mb-1" htmlFor="dfederal">Distrito Federal</label>
                                <input className="form-control" id="dfederal" name='dfederal' type="text"  onChange={(event) =>{setDfederal(event.target.value)}} />
                            </div>
                            
                            <div className="col-md-4">
                                <label className="small mb-1" htmlFor="dlocal">Distrito Local</label>
                                <input className="form-control" id="dlocal" name='dlocal' type="text"  onChange={(event) =>{setDlocal(event.target.value)}} />
                            </div>
                            <div className="col-md-4">
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
                                <label className="small mb-1" htmlFor="ncelular">No. Celular</label>
                                <input className="form-control" id="ncelular" name='ncelular' type="tel"  onChange={(event) =>{setCelular(event.target.value)}}/>
                            </div>
                            
                            <div className="col-md-6">
                            <label className="small mb-1" htmlFor="email">Email</label>
                            <input className="form-control" id="email" name='email' type="email"  onChange={(event) =>{setEmail(event.target.value)}} />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="facebook">Facebook</label>
                                <input className="form-control" name='facebook' id="facebook" type="text"  onChange={(event) =>{setFacebook(event.target.value)}} />
                            </div>
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="twitter">Twitter</label>
                                <input className="form-control" id="twitter" name='twitter' type="text"  onChange={(event) =>{setTwitter(event.target.value)}} />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="otrared">Otra red</label>
                            <input className="form-control" id="otrared" name='otrared' type="text"  onChange={(event) =>{setOtra(event.target.value)}}/>
                        </div>
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="contacto">Contacto</label>
                                <input className="form-control" id="contacto" name='contacto' type="text"  onChange={(event) =>{setContacto(event.target.value)}}/>
                            </div>
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="celcontacto">No. Celular Contacto</label>
                                <input className="form-control" id="celcontacto" name='celcontacto' type="text"  onChange={(event) =>{setCelcontacto(event.target.value)}} />
                            </div>
                        </div>
                        <hr></hr>
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="descapoyo">Descripción de Apoyo</label>
                            <input className="form-control" id="descapoyo" name='descapoyo' type="text"  onChange={(event) =>{setDescapoyo(event.target.value)}} />
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
                                <label className="small mb-1" htmlFor="monto">Monto de Apoyo</label>
                                <input className="form-control" id="monto" name='monto' type="text"  onChange={(event) =>{setMonto(event.target.value)}}/>
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
                        
                        
                        
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

        

    </div>

  );
}

export default EditApp;
