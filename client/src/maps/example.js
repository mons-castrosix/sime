import React, { Component } from 'react';
import { GoogleMap, KmlLayer, LoadScript, Marker,Polyline,Rectangle } from '@react-google-maps/api';
import config from './config.json';

const mapContainerStyle = {
  width: '100vw', height: '100vh'
};

const center = {
  lat: 19.2130929078429,
  lng: -101.09697103412132
};

const onLoad = rectangle => {
  console.log('rectangle: ', rectangle)
}


function Example() {
  
    return (
      <div>
        <LoadScript googleMapsApiKey={config.GOOGLE_MAP_API_KEY}>
        <GoogleMap
    id="rectangle-example"
    mapContainerStyle={mapContainerStyle}
    zoom={11}
    center={center}
  >
    <KmlLayer url='http://drive.google.com/uc?export=download&id=1JIOp7HLCB5ICIKrJwcPZoAc6MrpuPbQq'></KmlLayer>
  </GoogleMap>
        </LoadScript>
      </div>
    );
  
}
export default Example;



/*import React, { Component } from 'react';
import { GoogleMap, KmlLayer, LoadScript, Marker,Polyline } from '@react-google-maps/api';
import config from './config.json';






const mapStyle = { width: '90vw', height: '90vh' };

const DEPAUW_CENTER = { lat: 19.2130929078429, lng: -101.09697103412132 };

const DEPAUW_BOUNDS = {
  north: 39.653244,
  south: 39.621949,
  west: -86.902833,
  east: -86.831743,
};

const option = {
  

  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: true,
  fullscreenControl: false,
  clickableIcons: true,
};
 const onLoad = kml => {
    console.log('onLoad: ', kml)
    
  };
 

function Example() {
  
    return (
      <div>
        <LoadScript googleMapsApiKey={config.GOOGLE_MAP_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyle}
            center={DEPAUW_CENTER}
            zoom={7}
            options={option}
          >
            <KmlLayer></KmlLayer>
          </GoogleMap>

        </LoadScript>
      </div>
    );
  
}
export default Example;

*/
