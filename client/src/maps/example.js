import React from 'react';
import { GoogleMap, KmlLayer, LoadScript, InfoWindowF,Marker,Polyline,Rectangle } from '@react-google-maps/api';
import config from './config.json';

const mapContainerStyle = {
  width: '98vw', height: '98vh'
};
const option = {

  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  fullscreenControl: true,
  clickableIcons: true,
  streetViewPanorama:true,
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

const onClick = click =>{
  console.log('click: ',click.featureData
  )
}


const positio={lat: 19.312116839964077, lng:   -101.56639341054306}
/*
const onMouseOver = mouse =>{
  console.log('mouse:',mouse.latLng)
}*/
const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15
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
          options={option}
          
          
        >
        
      <KmlLayer 
      url='http://drive.google.com/uc?export=download&id=1P_HwE8ONn-TFAnAqiLcuXQ7XzuZxW1Pu'
      onClick={onClick}
      options={option}
      >
      
      
      </KmlLayer>
  
  </GoogleMap>
        </LoadScript>
      </div>
    );
  
}
export default Example;



