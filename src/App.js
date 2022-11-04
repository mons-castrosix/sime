
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
      Completa el siguiente registro:
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
          <div class="form-group col-lg-2 col-md-4 col-sm-4 col-6">
          <label for="calle">Calle (INE)</label>
          <input type="text" className="form-control" id="calle" name="calle" placeholder="Calle" required />
          </div>
          <div class="form-group col-lg-2 col-md-4 col-sm-4 col-6">
          <label for="numero">No. (INE)</label>
          <input type="text" className="form-control" id="numero" name="numero" placeholder="Número" required />
          </div>
          
          <div class="form-group col-lg-3 col-md-4 col-sm-4 col-6">
          <label for="colonia">Colonia (INE)</label>
          <input type="text" className="form-control" id="colonia" name="colonia" placeholder="Colonia" required />
          </div>
          <div class="form-group col-lg-2 col-md-4 col-sm-4 col-6">
          <label for="cpostal">CP (INE)</label>
          <input type="text" className="form-control" id="cpostal" name="cpostal" placeholder="Código Postal" required />
          </div>
          <div class="form-group col-lg-3 col-md-4 col-sm-4 col-6">
          <label for="colonia">Ciudad(INE) </label>
          <input type="text" className="form-control" id="ciudad" name="ciudad" placeholder="Ciudad" required />
          </div>
        </div>
      </div>
        

        
        <div class="form-group">
          <label for="inputEmail">Apellido Materno (INE)</label>
          <input type="email" class="form-control" id="inputEmail" name="email" placeholder="Enter email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
          <small class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        

        
        <div class="form-group">
          <label for="inputPhone">Phone</label>
          <input type="tel" class="form-control" id="inputPhone" name="phone" placeholder="099xxxxxxx" pattern="\d{3}\d{3}\d{4}" required />
          <small class="form-text text-muted">We'll never share your phone number with anyone else.</small>
        </div>
        

        
        <div class="form-row">
          
          <div class="form-group col-md-4">
            <label for="inputDate">Date</label>
            <input type="date" class="form-control" id="inputDate" name="date" required />
            <small class="form-text text-muted">Please choose date and time for meeting.</small>
          </div>
          

          
          <div class="form-group col-md-4">
            <label>Start Time</label>
            <div class="d-flex flex-row justify-content-between align-items-center">
              <select class="form-control mr-1" id="inputStartTimeHour" name="startHour" required>
                <option value="" disabled selected>Hour</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
              </select>
              <div class="pl-1 pr-2">:</div>
              <select class="form-control" id="inputStartTimeMinute" name="startMinute" required>
                <option value="" disabled selected>Min</option>
                <option value="00">00</option>
                <option value="00">30</option>
              </select>
            </div>
          </div>
          

         
          <div class="form-group col-md-4">
            <label>End Time</label>
            <div class="d-flex flex-row justify-content-between align-items-center">
              <select class="form-control mr-1" id="inputEndTimeHour" name="endHour" required>
                <option value="" disabled selected>Hour</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
              </select>
              <div class="pl-1 pr-2">:</div>
              <select class="form-control" id="inputEndTimeMinute" name="endMinute" required>
                <option value="" disabled selected>Min</option>
                <option value="00">00</option>
                <option value="00">30</option>
              </select>
            </div>
          </div>
          
        </div>
        

        
        <div class="form-group">
          <legend class="col-form-label pt-0">Choose a Room</legend>
          <div class="form-check form-check-inline">
            <input type="radio" class="form-check-input" id="inlineRadioType1" name="roomType" value="type1" required />
            <label class="form-check-label" for="inlineRadioType1">Room 1 (10 People)</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="radio" class="form-check-input" id="inlineRadioType2" name="roomType" value="type2" required />
            <label class="form-check-label" for="inlineRadioType2">Room 2 (20 People)</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="radio" class="form-check-input" id="inlineRadioType3" name="roomType" value="type3" required />
            <label class="form-check-label" for="inlineRadioType3">Room 3 (30 People)</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="radio" class="form-check-input" id="inlineRadioType4" name="roomType" value="type4" required />
            <label class="form-check-label" for="inlineRadioType4">Room 4 (40 People)</label>
          </div>
        </div>
        

        <hr />

        
        <div class="form-row">
          <legend class="col-form-label pb-3">Snack and Drink</legend>
          <div class="row px-1">
            <div class="form-group col-lg-2 col-md-3 col-sm-4 col-6">
              <img src="https://i.ibb.co/k4tBpTp/snack-set-1.jpg" alt="snack-box-set-1" class="img-thumbnail" />
              <br />
              <label for=" inputSnack1">Sandwich Set 1</label>
              <input type="number" class="form-control" id="inputSnack1" name="snack1" min="0" max="40" />
              <small class="form-text text-muted">Crabstick Sandwich.</small>
            </div>
            <div class="form-group col-lg-2 col-md-3 col-sm-4 col-6">
              <img src="https://i.ibb.co/DW0cv1s/snack-set-2.jpg" alt="snack-box-set-2" class="img-thumbnail" />
              <br />
              <label for="inputSnack2">Sandwich Set 2</label>
              <input type="number" class="form-control" id="inputSnack2" name="snack2" min="0" max="40" />
              <small class="form-text text-muted">Tuna Sandwich.</small>
            </div>
            <div class="form-group col-lg-2 col-md-3 col-sm-4 col-6">
              <img src="https://i.ibb.co/YdZF2Q8/snack-set-3.jpg" alt="snack-box-set-3" class="img-thumbnail" />
              <br />
              <label for="inputSnack3">Sandwich Set 3</label>
              <input type="number" class="form-control" id="inputSnack3" name="snack3" min="0" max="40" />
              <small class="form-text text-muted">Crab Roll Sandwich.</small>
            </div>
            <div class="form-group col-lg-2 col-md-3 col-sm-4 col-6">
              <img src="https://i.ibb.co/6mZ2zb0/snack-set-4.jpg" alt="snack-box-set-4" class="img-thumbnail" />
              <br />
              <label for="inputSnack4">Sandwich Set 4</label>
              <input type="number" class="form-control" id="inputSnack4" name="snack4" min="0" max="40" />
              <small class="form-text text-muted">Tuna Sandwich.</small>
            </div>
            <div class="form-group col-lg-2 col-md-3 col-sm-4 col-6">
              <img src="https://i.ibb.co/1rsRBD1/snack-set-5.jpg" alt="snack-box-set-5" class="img-thumbnail" />
              <br />
              <label for="inputSnack5">Sandwich Set 5</label>
              <input type="number" class="form-control" id="inputSnack5" name="snack5" min="0" max="40" />
              <small class="form-text text-muted">Ham Sandwich.</small>
            </div>
            <div class="form-group col-lg-2 col-md-3 col-sm-4 col-6">
              <img src="https://i.ibb.co/PhR8YDN/snack-set-6.jpg" alt="snack-box-set-6" class="img-thumbnail" />
              <br />
              <label for="inputSnack5">Sandwich Set 6</label>
              <input type="number" class="form-control" id="inputSnack6" name="snack6" min="0" max="40" />
              <small class="form-text text-muted">Roast Pork Bun.</small>
            </div>
          </div>
        </div>
       
        <div class="form-group">
          <label for="textAreaRemark">Notes</label>
          <textarea class="form-control" name="remark" id="textAreaRemark" rows="2" placeholder="Tell us you want more..."></textarea>
        </div>
       
        <button class="btn btn-primary btn-block col-lg-2" type="submit">Submit</button>
       
      </form>
      
    </div>
    
  </div>
    </div>
  );
}

export default App;
