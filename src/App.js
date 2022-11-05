import React from 'react';
import apoyo from './apoyos.png'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <div className="container">
    <div class="text-center pt-5">
    <img src={apoyo}alt="network-logo" width="72" height="72" />
    <h2>Registro Apoyos</h2>
    <p>
     
    </p>
  </div>
  

  <div class="card">
    
    <div class="card-body">
     
      <form id="bookingForm" action="#" method="" class="needs-validation" novalidate autocomplete="off">
      <div class="form-row">
        <div class="row px-1">
          <div class="form-group col-lg-4 col-md-4 col-sm-4 col-6">
          <label for="apaterno">Apellido Paterno (INE)</label>
          <input type="text" className="form-control" id="aparterno" name="apaterno" placeholder="Apellido Paterno" required />
          </div>
          
          <div class="form-group col-lg-4 col-md-4 col-sm-4 col-6">
          <label for="amaterno">Apellido Materno (INE)</label>
          <input type="text" className="form-control" id="amarterno" name="amaterno" placeholder="Apellido Materno" required />
          </div>
          
          <div class="form-group col-lg-4 col-md-4 col-sm-4 col-6">
          <label for="nombre">Nombre (INE)</label>
          <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre (s)" required />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="row px-1">
          <div class="form-group col-lg-2 col-md-2 col-sm-2 col-6">
          <label for="calle">Calle (INE)</label>
          <input type="text" className="form-control" id="calle" name="calle" placeholder="Calle" required />
          </div>
          <div class="form-group col-lg-2 col-md-2 col-sm-2 col-6">
          <label for="numero">No. (INE)</label>
          <input type="text" className="form-control" id="numero" name="numero" placeholder="Número" required />
          </div>
          
          <div class="form-group col-lg-3 col-md-3 col-sm-3 col-6">
          <label for="colonia">Colonia (INE)</label>
          <input type="text" className="form-control" id="colonia" name="colonia" placeholder="Colonia" required />
          </div>
          <div class="form-group col-lg-2 col-md-2 col-sm-2 col-6">
          <label for="cpostal">CP (INE)</label>
          <input type="text" className="form-control" id="cpostal" name="cpostal" placeholder="Código Postal" required />
          </div>
          <div class="form-group col-lg-3 col-md-4 col-sm-4 col-6">
          <label for="colonia">Ciudad(INE) </label>
          <input type="text" className="form-control" id="ciudad" name="ciudad" placeholder="Ciudad" required />
          </div>
        </div>
      </div>
        
      <div class="form-row">
        <div class="row px-1">
          <div class="form-group col-lg-3 col-md-3 col-sm-3 col-6">
          <label for="celectoral">Clave Electoral(INE)</label>
          <input type="text" class="form-control" id="celectoral" name="celectoral" placeholder="Clave electoral"  required />
          </div>
          <div class="form-group col-lg-3 col-md-3 col-sm-3 col-6">
          <label for="curp">CURP (INE)</label>
          <input type="text" className="form-control" id="curp" name="curp" placeholder="CURP" required />
          </div>
          
          <div class="form-group col-lg-3 col-md-3 col-sm-3 col-6">
          <label for="fnacimiento">Fecha de Nacimiento (INE)</label>
          <input type="text" className="form-control" id="fnacimiento" name="fnacimiento" placeholder="Fecha de Nacimiento" required />
          </div>
          <div class="form-group col-lg-3 col-md-3 col-sm-3 col-6">
          <label for="secc">Sección</label>
          <input type="text" className="form-control" id="secc" name="secc" placeholder="Sección" required />
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="row px-1">
          <div class="form-group col-lg-4 col-md-6">
            <label for="df">Distrito Federal</label>
            <input type="text" class="form-control" id="df" name="df" required />
            
          </div>
          <div class="form-group col-lg-4 col-md-6">
            <label for="df">Distrito Local</label>
            <input type="text" class="form-control" id="dl" name="dl" required />
            
          </div>
          <div class="form-group col-lg-4 col-md-6">
            <label for="nivel">Nivel</label>
            <select class="form-control mr-1" id="nivel" name="nivel" required>
                <option value="" disabled selected>Elije un nivel</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
               
              </select>
          </div>
        </div>
      </div>
      <hr />
      <div class="form-row">
        <div class="row px-1">
          <div class="form-group col-lg-4 col-md-6">
            <label for="cel">No. Celular</label>
            <input type="text" class="form-control" id="cel" name="cel" required />
          </div>
          <div class="form-group col-lg-4 col-md-6">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
            
          </div>
          <div class="form-group col-lg-4 col-md-6">
            <label for="fb">Facebook</label>
            <input type="text" class="form-control" id="fb" name="fb" placeholder=""  required />
            
          </div>
          
        </div>
      </div>

      <div class="form-row">
        <div class="row px-1">
          <div class="form-group col-lg-6 col-md-6">
          <label for="tw">Twitter</label>
            <input type="text" class="form-control" id="tw" name="tw" placeholder=""  required />
            
          </div>
          <div class="form-group col-lg-6 col-md-6">
            <label for="otrared">Otra red social</label>
            <input type="text" class="form-control" id="otrared" name="otrared" placeholder=""  required />
            
          </div>
          
        </div>
      </div>

      <hr></hr>
      <div class="form-row">
        <div class="row px-1">
          <div class="form-group col-lg-12 col-md-12">
          <label for="tw">Descripción de Apoyo</label>
            <input type="text" class="form-control" id="tw" name="tw" placeholder=""  required />
            
          </div>
        </div>
      </div> 
    
      <div class="form-row">
        <div class="row px-1">
          <div class="form-group col-lg-4 col-md-4">
          <label for="tw">Tipo de Apoyo</label>
            <select class="form-control mr-1" id="nivel" name="nivel" required>
                <option value="" disabled selected>Selecciona alguna opcion</option>
                <option value="1">Económico</option>
                <option value="2">Especie</option>
                <option value="3">Con terceros</option>
               
            </select>
            
          </div>
          <div class="form-group col-lg-4 col-md-4">
          <label for="tw">Monto de Apoyo</label>
            <input type="number" class="form-control" id="tw" name="tw" placeholder=""  required />
            
          </div>
          <div class="form-group col-lg-4 col-md-4">
          <label for="tw">Alcance de Apoyo</label>
            <select class="form-control mr-1" id="nivel" name="nivel" required>
                <option value="" disabled selected>Selecciona alguna opcion</option>
                <option value="1">Personal</option>
                <option value="2">Familiar</option>
                <option value="3">Comunitario</option>
               
            </select>
            
          </div>
        </div>
      </div>    

      <div class="form-row">
        <div class="row px-1">
          
        <div class="form-group col-lg-6 col-md-6">
            <label for="otrared">Contacto</label>
            <input type="text" class="form-control" id="otrared" name="otrared" placeholder=""  required />
            
          </div>
          <div class="form-group col-lg-6 col-md-6">
            <label for="otrared">No. Celular de Contacto</label>
            <input type="text" class="form-control" id="otrared" name="otrared" placeholder=""  required />
            
          </div>
          
        </div>
      </div>   
      
      <div class="form-row">
        <div class="row">
          
          <div class="form-group col-lg-3 col-md-6"></div>
          <div class="form-group col-lg-3 col-md-6"></div>
          <div class="form-group col-lg-6 col-md-6">
          <button  class="btn btn-primary btn-block col-lg-2" type="submit">Guardar</button>
          </div>
          
        </div>
      </div> 
        

       
        
        
        

        
       

       
       
        
       
       
       
      </form>
      
    </div>
    
  </div>
    </div>
  );
}

export default App;
