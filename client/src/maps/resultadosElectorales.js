import React, { useState } from 'react';
import { GoogleMap, KmlLayer, LoadScript, InfoWindow, Marker, Polyline, Rectangle } from '@react-google-maps/api';
import config from './config.json';
import './maps.css';


const mapContainerStyle = {
  width: '72vw', height: '98vh'
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
  suppressInfoWindows: true,
};
const optionMap = {
  clickable: true,
  preserveViewport: true,
  screenOverlays: true,
  suppressInfoWindows: true
}
const center = {
  lat: 19.2130929078429,
  lng: -101.09697103412132
};

const onLoad = rectangle => {
  console.log('rectangle: ', rectangle)
}




/*
const onMouseOver = mouse =>{
  console.log('mouse:',mouse.latLng)
}*/


function Resultados() {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [peopleInfo, setPeopleInfo] = useState([]);
  const [list, setList] = useState([]);
  const descrip = []
  const onClick = click => {

    descrip['datos'] = click.featureData.description.split('<br>')
    console.log('click: ', descrip['datos'][1])
    setList(descrip['datos']);

  }
  console.log(list);
  const renderList = list.map((item, index) =>
    <div key={index}>{item}</div>
  );





  return (
    <div className='divmap'>
      <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous" />
      <link href="https://cdn.datatables.net/v/dt/dt-1.13.4/datatables.min.css" rel="stylesheet" />

      <script src="https://cdn.datatables.net/v/dt/dt-1.13.4/datatables.min.js"></script>
      <div className='row'>
        <aside className='col-md-3'>
          <div className="card" id="detalles">
            <div className='card-header text-center'>
              <h6 >Descripción</h6>
            </div>
            <table id="example" className="table table-striped" style={{ marginRight: 100 + '%' }} >
              <thead>
                <tr>

                  <th colSpan="2">Distritos</th>

                </tr>
              </thead>
              <tbody>
              <tr>
                {list.map((item, index) => {
                  if (index == 1) {
                    return(<td id={index} key={index}>{item}</td>);
                  }
                  if(index ==2){
                    return(<td id={index} key={index}>{item}</td>);
                  }
                }

                )}

              </tr>
              <tr>
                {list.map((item, index) => {
                  if (index == 3) {
                    var i=item.split(":");
                    console.log();
                    return(<td colSpan="2" id={index} key={index}>{i[0]}:{i[1]}</td>);
                  }
                }
                )}
              </tr>
              <tr>
                {list.map((item, index) => {
                  if (index == 4) {
                   
                    return(<td  id={index} key={index}>{item}</td>);
                  }
                  if (index == 5) {
                   
                   return(<td id={index} key={index}>{item}</td>);
                 }
                }
                )}
              </tr>
              <tr>
                
                {list.map((item, index) => {
                  if (index == 6) {
                   
                    return(<td colSpan="2"  id={index} key={index}>{item}</td>);
                  }
                }
                )}
              </tr>
              <tr>
                {list.map((item, index) => {
                  if (index == 7) {
                   
                    return(<td colSpan="2"  id={index} key={index}>{item}</td>);
                  }
                }
                )}
              </tr>
              <tr>
                {list.map((item, index) => {
                  if (index == 7) {
                   
                    return(<td colSpan="2"  id={index} key={index}>{item}</td>);
                  }
                }
                )}
              </tr>
              <tr>
                {list.map((item, index) => {
                  if (index == 8) {
                   
                    return(<td colSpan="2"  id={index} key={index}>{item}</td>);
                  }
                }
                )}
              </tr>
              <tr>
                {list.map((item, index) => {
                  if (index == 9) {
                   
                    return(<td colSpan="2"   key={index}>{item}</td>);
                  }
                }
                )}
              </tr>
              <tr>
                {list.map((item, index) => {
                  if (index == 10) {
                   
                    return(<td colSpan="2"  id={index} key={index}>{item}</td>);
                  }
                }
                )}
              </tr>
              <tr>
                {list.map((item, index) => {
                  if (index == 11) {
                   
                    return(<td colSpan="2"   key={index}>{item}</td>);
                  }
                }
                )}
              </tr>
              <tr>
                {list.map((item, index) => {
                  if (index == 12) {
                   
                    return(<td colSpan="2"  id={index} key={index}>{item}</td>);
                  }
                }
                )}
              </tr>
              <tr>
                {list.map((item, index) => {
                  if (index == 13) {
                   
                    return(<td colSpan="2"   key={index}>{item}</td>);
                  }
                }
                )}
              </tr>
              <tr>
                {list.map((item, index) => {
                  if (index == 14) {
                   
                    return(<td colSpan="2"  key={index}>{item}</td>);
                  }
                }
                )}
              </tr>
              








              </tbody>

            </table>
            



          </div>

        </aside>
        <main className='col-md-9 col-lg-9 col-9'>

          <LoadScript googleMapsApiKey={config.GOOGLE_MAP_API_KEY}>
            <GoogleMap
              id="rectangle-example"
              mapContainerStyle={mapContainerStyle}
              zoom={16}
              center={center}
              options={option}


            >




              <KmlLayer

                url='http://drive.google.com/uc?export=download&id=19WoaZD0MxNq-7GE6c-hKYDkkZyDWns0d'
                onClick={onClick}
                options={option}
              >

              </KmlLayer>

            </GoogleMap>
          </LoadScript>
        </main>

      </div>

    </div>

  );

}
export default Resultados;