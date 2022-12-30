import React, { Component } from 'react';
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
  clickableIcons: false,
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
            <KmlLayer 
             
            
            url='http://drive.google.com/uc?export=download&id=1JIOp7HLCB5ICIKrJwcPZoAc6MrpuPbQqp'
            ></KmlLayer>
          </GoogleMap>

        </LoadScript>
      </div>
    );
  
}
export default Example;


