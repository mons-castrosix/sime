import React, { useState } from 'react';
import apoyo from './apoyos.png'
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

function Apoyos() {
  const [aPaterno,setApaterno]= useState('');
  const [aMaterno,setAmaterno]=useState('');
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
  const [nivel,setNivel]=useState(0);
  const [celular, setCelular]=useState('');
  const [email, setEmail]=useState('');
  const [facebook, setFacebook]=useState('');
  const [twitter, setTwitter]=useState('');
  const [otra, setOtra]=useState('');
  const [descrApoyo, setDescapoyo]=useState('');
  const [tipoApoyo, setTipoapoyo]=useState('');
  const [monto, setMonto]=useState(0);
  const [alcance, setAlcance]=useState('');
  const [contacto, setContacto]=useState('');
  const [celContacto, setCelcontacto]=useState('');

  const submitReview = () =>{
    Axios.post("http://localhost:3001/api/insert",{
    apaterno:aPaterno,amaterno:aMaterno,nombres:nombres,calle:calle,numero:numero,colonia:colonia,cp:cp,
    ciudad:ciudad,clave_elector:claveElectoral,curp:curp,fecha_nacimiento:fecha,seccion:seccion,distrito_federal:dfederal,
    distrito_local:dLocal,nivel:nivel,no_celular:celular,facebook:facebook,twitter:twitter,
    otra_red:otra,descripcion_apoyo:descrApoyo,monto_apoyo:monto,alcance_apoyo:alcance,contacto:contacto,
    no_celcontacto:contacto
    }).then(() => {
      alert("Registrado");
    });
    console.log(aPaterno + aMaterno + nombres + calle + numero + colonia + cp + ciudad 
      + claveElectoral + curp + fecha + seccion + dfederal + dLocal + nivel
      + celular + email + facebook + twitter + otra + descrApoyo + tipoApoyo
      + monto + alcance + contacto + celContacto)
  }

  return (
    <div className="container">
    
    <div className="text-center pt-5">
    <img src={apoyo} alt="network-logo" width="72" height="72" />
    <h2>Registro Apoyos</h2>
    <p>
     
    </p>
  </div>
  

  <div className="card">
    
    <div className="card-body">
     
    <div className="form-row">
        <div className="row px-1">
          <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <label htmlFor="ine">Cargar INE</label>
          <input 
          type="file" 
          className="form-control" 
          id="ine" 
          capture='enviroment'
          name="ine" 
          accept='image/*'
          enctype="multipart/form-data"
          
          required 
          onChange={(event) =>{setApaterno(event.target.value)}} />

          
          </div>
          <button onClick={submitReview}  className="btn btn-primary col-lg-2" type="submit">Guardar</button>
          
          
          
          
          
        </div>
      </div>
      <div className="form-row">
        <div className="row px-1">
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
          <label htmlFor="apaterno">Apellido Paterno (INE)</label>
          <input 
          type="text" 
          className="form-control" 
          id="aparterno" 
          name="apaterno" 
          placeholder="Apellido Paterno" required 
          onChange={(event) =>{setApaterno(event.target.value)}} />
          </div>
          
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
          <label htmlFor="amaterno">Apellido Materno (INE)</label>
          <input 
          type="text" 
          className="form-control" 
          id="amarterno" 
          name="amaterno" 
          placeholder="Apellido Materno" required 
          onChange={(event) =>{setAmaterno(event.target.value)}}/>
          </div>
          
          <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
          <label htmlFor="nombre">Nombre (INE)</label>
          <input 
          type="text" 
          className="form-control" 
          id="nombre" 
          name="nombre" 
          placeholder="Nombre (s)" required 
          onChange={(event) =>{setNombres(event.target.value)}}/>
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="row px-1">
          <div className="form-group col-lg-2 col-md-2 col-sm-2 col-6">
          <label htmlFor="calle">Calle (INE)</label>
          <input 
          type="text" 
          className="form-control" 
          id="calle" 
          name="calle" 
          placeholder="Calle" required 
          onChange={(event) =>{setCalle(event.target.value)}}/>
          </div>
          <div className="form-group col-lg-2 col-md-2 col-sm-2 col-6">
          <label htmlFor="numero">No. (INE)</label>
          <input 
          type="text" 
          className="form-control" 
          id="numero" 
          name="numero" 
          placeholder="Número" required 
          onChange={(event) =>{setNumero(event.target.value)}} />
          </div>
          
          <div className="form-group col-lg-3 col-md-3 col-sm-3 col-6">
          <label htmlFor="colonia">Colonia (INE)</label>
          <input 
          type="text" 
          className="form-control" 
          id="colonia" 
          name="colonia" 
          placeholder="Colonia" required 
          onChange={(event) =>{setColonia(event.target.value)}} />
          </div>
          <div className="form-group col-lg-2 col-md-2 col-sm-2 col-6">
          <label htmlFor="cpostal">CP (INE)</label>
          <input 
          type="text" 
          className="form-control" 
          id="cpostal" 
          name="cpostal" 
          placeholder="Código Postal" required 
          onChange={(event) =>{setCp(event.target.value)}} />
          </div>
          <div className="form-group col-lg-3 col-md-4 col-sm-4 col-6">
          <label htmlFor="colonia">Ciudad(INE) </label>
          <input 
          type="text" 
          className="form-control" 
          id="ciudad" 
          name="ciudad" 
          placeholder="Ciudad" required 
          onChange={(event) =>{setCiudad(event.target.value)}} />
          </div>
        </div>
      </div>
        
      <div className="form-row">
        <div className="row px-1">
          <div className="form-group col-lg-3 col-md-3 col-sm-3 col-6">
          <label htmlFor="celectoral">Clave Electoral(INE)</label>
          <input 
          type="text" 
          className="form-control" 
          id="celectoral" 
          name="celectoral" 
          placeholder="Clave electoral"  required 
          onChange={(event) =>{setClave(event.target.value)}} />
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-3 col-6">
          <label htmlFor="curp">CURP (INE)</label>
          <input 
          type="text" 
          className="form-control" 
          id="curp" 
          name="curp" 
          placeholder="CURP" required 
          onChange={(event) =>{setCurp(event.target.value)}} />
          </div>
          
          <div className="form-group col-lg-3 col-md-3 col-sm-3 col-6">
          <label htmlFor="fnacimiento">Fecha de Nacimiento (INE)</label>
          <input 
          type="date" 
          className="form-control" 
          id="fnacimiento" 
          name="fnacimiento" 
          placeholder="Fecha de Nacimiento" required 
          onChange={(event) =>{setFecha(event.target.value)}}/>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-3 col-6">
          <label htmlFor="secc">Sección</label>
          <input 
          type="text" 
          className="form-control" 
          id="secc" 
          name="secc" 
          placeholder="Sección" required 
          onChange={(event) =>{setSeccion(event.target.value)}}/>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="row px-1">
          <div className="form-group col-lg-4 col-md-6">
            <label htmlFor="df">Distrito Federal</label>
            <input 
            type="number" 
            className="form-control" 
            id="df" 
            name="df" required 
            onChange={(event) =>{setDfederal(event.target.value)}} />
            
          </div>
          <div className="form-group col-lg-4 col-md-6">
            <label htmlFor="df">Distrito Local</label>
            <input 
            type="number" 
            className="form-control" 
            id="dl" 
            name="dl" required 
            onChange={(event) =>{setDlocal(event.target.value)}} />
            
          </div>
          <div className="form-group col-lg-4 col-md-6">
            <label htmlFor="nivel">Nivel</label>
            <select 
            className="form-control mr-1"  
            id="nivel" 
            name="nivel" required 
            onChange={(event) =>{setNivel(event.target.value)}}>
                <option value="" selected>Elije un nivel</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
               
              </select>
          </div>
        </div>
      </div>
      <hr />
      <div className="form-row">
        <div className="row px-1">
          <div className="form-group col-lg-4 col-md-6">
            <label htmlFor="cel">No. Celular</label>
            <input 
            type="text" 
            className="form-control" 
            id="cel" 
            name="cel" required 
            onChange={(event) =>{setCelular(event.target.value)}} />
          </div>
          <div className="form-group col-lg-4 col-md-6">
            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required 
            onChange={(event) =>{setEmail(event.target.value)}}/>
            
          </div>
          <div className="form-group col-lg-4 col-md-6">
            <label htmlFor="fb">Facebook</label>
            <input 
            type="text" 
            className="form-control" 
            id="fb" 
            name="fb" 
            placeholder=""  required 
            onChange={(event) =>{setFacebook(event.target.value)}}/>
            
          </div>
          
        </div>
      </div>

      <div className="form-row">
        <div className="row px-1">
          <div className="form-group col-lg-6 col-md-6">
          <label htmlFor="tw">Twitter</label>
            <input 
            type="text" 
            className="form-control" 
            id="tw" 
            name="tw" 
            placeholder=""  required 
            onChange={(event) =>{setTwitter(event.target.value)}} />
            
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <label htmlFor="otrared">Otra red social</label>
            <input 
            type="text" 
            className="form-control" 
            id="otrared" 
            name="otrared" 
            placeholder=""  required 
            onChange={(event) =>{setOtra(event.target.value)}}/>
            
          </div>
          
        </div>
      </div>

      <hr></hr>
      <div className="form-row">
        <div className="row px-1">
          <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="tw">Descripción de Apoyo</label>
            <input 
            type="text" 
            className="form-control" 
            id="descapoyo" 
            name="descapoyo" 
            placeholder=""  required 
            onChange={(event) =>{setDescapoyo(event.target.value)}} />
            
          </div>
        </div>
      </div> 
    
      <div className="form-row">
        <div className="row px-1">
          <div className="form-group col-lg-4 col-md-4">
          <label htmlFor="tw">Tipo de Apoyo</label>
            <select 
            className="form-control mr-1" 
            id="tipoapoyo" 
            name="tipoapoyo" required 
            onChange={(event) =>{setTipoapoyo(event.target.value)}}>
                <option value="" disabled selected>Selecciona alguna opcion</option>
                <option value="1">Económico</option>
                <option value="2">Especie</option>
                <option value="3">Con terceros</option>
               
            </select>
            
          </div>
          <div className="form-group col-lg-4 col-md-4">
          <label htmlFor="tw">Monto de Apoyo</label>
            <input 
            type="number" 
            className="form-control" 
            id="montoapoyo" 
            name="montoapoyo" 
            placeholder=""  required 
            onChange={(event) =>{setMonto(event.target.value)}} />
            
          </div>
          <div className="form-group col-lg-4 col-md-4">
          <label htmlFor="tw">Alcance de Apoyo</label>
            <select 
            className="form-control mr-1" 
            id="alcanceapoyo" 
            name="alcanceapoyo" required 
            onChange={(event) =>{setAlcance(event.target.value)}}>
                <option value="" disabled selected>Selecciona alguna opcion</option>
                <option value="1">Personal</option>
                <option value="2">Familiar</option>
                <option value="3">Comunitario</option>
               
            </select>
            
          </div>
        </div>
      </div>    

      <div className="form-row">
        <div className="row px-1">
          
        <div className="form-group col-lg-6 col-md-6">
            <label htmlFor="otrared">Contacto</label>
            <input 
            type="text" 
            className="form-control" 
            id="contacto" 
            name="contacto" 
            placeholder=""  required 
            onChange={(event) =>{setContacto(event.target.value)}} />
            
          </div>
          <div className="form-group col-lg-6 col-md-6">
            <label htmlFor="otrared">No. Celular de Contacto</label>
            <input 
            type="text" 
            className="form-control" 
            id="nocontacto" 
            name="nocontacto" 
            placeholder=""  required 
            onChange={(event) =>{setCelcontacto(event.target.value)}} />
            
          </div>
          
        </div>
      </div>   
      
      <div className="form-row">
        <div className="row">
          
          
          <div className="form-group col-lg-6 col-md-6">
          <button onClick={submitReview}  className="btn btn-primary btn-block col-lg-2" type="submit">Guardar</button>
          </div>
          
        </div>
      </div> 
        

       
        
        
        

        
       

       
       
        
       
       
       
      
      
    </div>
    
  </div>
    </div>
  );
}

export default Apoyos;
