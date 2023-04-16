import React,{ useState } from 'react';
import { GoogleMap, KmlLayer, LoadScript, InfoWindow,Marker,Polyline,Rectangle } from '@react-google-maps/api';
import config from './config.json';
import './maps.css';


const mapContainerStyle = {
  width: '72vw', height: '98vh'
};
const divStyle = {
  background: `white`,
 
  width:'50px',
  height:'10px',
  fontSize:'10px'
}
const option = {

  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  fullscreenControl: true,
  clickableIcons: true,
  streetViewPanorama:true,
  suppressInfoWindows:false,
};
const optionMap={
  clickable:true,
  preserveViewport:true,
  screenOverlays:true,
  suppressInfoWindows:false
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
  const descrip=[]
const onClick = click =>{
  
  descrip['datos']=click.featureData.description.split('<br>')
  console.log('click: ',descrip
  )
  
}
  
    return ( 
     <div className='divmap'>
     <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous"/>
      <div className='row'>
      <aside className='col-md-3'>
      <div className="card">
      
    
	
	
	
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