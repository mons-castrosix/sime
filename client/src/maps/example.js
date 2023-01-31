import React,{ useState } from 'react';
import { GoogleMap, KmlLayer, LoadScript, InfoWindow,Marker,Polyline,Rectangle } from '@react-google-maps/api';
import config from './config.json';
import './maps.css';


const mapContainerStyle = {
  width: '74vw', height: '98vh'
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

const positions = [
  
  {id:1,persona:'Persona 1',lat: 19.67708293434324, lng:    -101.30195911697166},
  {id:2,persona:'Persona 2',lat: 19.674502612277184, lng:    -101.39236614686959},
  {id:3,persona:'Persona 3',lat: 19.641797181965238, lng:     -101.41114624408013},
  {id:4,persona:'Persona 4',lat: 19.77393757745782, lng:     -101.46668502728099},
  {id:5,persona:'Persona 5',lat: 19.808790918482668, lng:     -101.29900931651122},
  {id:6,persona:'Persona 6',lat: 19.783719839921176, lng:     -101.35727602324286},
  {id:7,persona:'Persona 7',lat: 19.73298165678351, lng:      -101.22481553262554},
  {id:8,persona:'Persona 8',lat: 19.72483219112784, lng:     -101.39592294903684},
  {id:9,persona:'Persona 9',lat: 19.548923517998286, lng:     -101.3498776789934},
  {id:10,persona:'Persona 10',lat: 19.64058828612842, lng:     -101.26365732414023},

  
];

/*
const onMouseOver = mouse =>{
  console.log('mouse:',mouse.latLng)
}*/


function Example() {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [peopleInfo, setPeopleInfo] = useState([]);
  
  const persona='Persona 1';
  const showInfoWindow = () => {
    setInfoWindowOpen(true);
   
  };
    return ( 
     <div className='divmap'>
     <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous"/>
      <div className='row'>
      <aside className='col-md-3 filter-group'>
      <div className="card">
		<article className="filter-group">
			<header className="card-header">
				<a href="#" data-bs-toggle="collapse" data-bs-target="#collapse_1" aria-expanded="true" className="">
					<i className="icon-control fa fa-chevron-down"></i>
					<h6 className="title">Filtros</h6>
				</a>
			</header>
			<div className="filter-content collapse show" id="collapse_1" >
				<div className="card-body">
					<form className="pb-3">
					<div className="input-group">
					<input type="text" className="form-control" placeholder="Search"/>
					<div className="input-group-append">
						<button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
					</div>
					</div>
					</form>
					<div className="card-body">

					{positions.map(val=>{
						return(
						<label className="custom-control custom-checkbox">
					<input
					type="checkbox"  
					className="custom-control-input"
						onChange={(e) =>{
							if (e.target.checked) {
							setPeopleInfo([
								...peopleInfo,
								{
								id:val.id ,
								persona:val.persona,
								lat:val.lat,
								lng:val.lng
								},
							]);
							} else {
							// remove from list
							setPeopleInfo(
								peopleInfo.filter((people) => people.id !== val.id),
							);
							}
						}}
					
						value={val.id}
					/>
					<div className="custom-control-label">{val.persona} 
					</div>
						</label>
						)
					})}
					
				</div> 
					

				</div>
			</div>
		</article> 
	
	
	
	</div> 

      </aside>
      <main className='col-md-9 col-lg-9 col-9'>
	  
      <LoadScript googleMapsApiKey={config.GOOGLE_MAP_API_KEY}>
        <GoogleMap
          id="rectangle-example"
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          options={option}
          
          
        >
        {peopleInfo.map(val=>{
          return( <Marker
          key={`marker-${val.id}`}
      onLoad={onLoad}
      position={{lat:val.lat,lng:val.lng}}
      label={val.persona}
      onClick={showInfoWindow}
    >
      
      {/*persona == val.persona*/
        infoWindowOpen && (
            <InfoWindow
            key={`marker-${val.persona}`}
            visible={true}
            
            onCloseClick={() => setInfoWindowOpen(false)}>
              <div style={divStyle}>{val.persona}</div>
            </InfoWindow>
          )}
    </Marker>);
        })}
       
         
        
      <KmlLayer 
      url='http://drive.google.com/uc?export=download&id=1P_HwE8ONn-TFAnAqiLcuXQ7XzuZxW1Pu'
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
export default Example;



/*<aside className='col-md-3 filter-group'>
      <div className="card">
	<article className="filter-group">
		<header className="card-header">
			<a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="">
				<i className="icon-control fa fa-chevron-down"></i>
				<h6 className="title">Product type</h6>
			</a>
		</header>
		<div className="filter-content collapse show" id="collapse_1" >
			<div className="card-body">
				<form className="pb-3">
				<div className="input-group">
				  <input type="text" className="form-control" placeholder="Search"/>
				  <div className="input-group-append">
				    <button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
				  </div>
				</div>
				</form>
				
				<ul className="list-menu">
				<li><a href="#">People  </a></li>
				<li><a href="#">Watches </a></li>
				<li><a href="#">Cinema  </a></li>
				<li><a href="#">Clothes  </a></li>
				<li><a href="#">Home items </a></li>
				<li><a href="#">Animals</a></li>
				<li><a href="#">People </a></li>
				</ul>

			</div>
		</div>
	</article> 
	<article className="filter-group">
		<header className="card-header">
			<a href="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="">
				<i className="icon-control fa fa-chevron-down"></i>
				<h6 className="title">Brands </h6>
			</a>
		</header>
		<div className="filter-content collapse show" id="collapse_2" >
			<div className="card-body">
				<label className="custom-control custom-checkbox">
				  <input type="checkbox"  className="custom-control-input"/>
				  <div className="custom-control-label">Mercedes  
				  	<b className="badge badge-pill badge-light float-right">120</b>  </div>
				</label>
				<label className="custom-control custom-checkbox">
				  <input type="checkbox"  className="custom-control-input"/>
				  <div className="custom-control-label">Toyota 
				  	<b className="badge badge-pill badge-light float-right">15</b>  </div>
				</label>
				<label className="custom-control custom-checkbox">
				  <input type="checkbox"  className="custom-control-input"/>
				  <div className="custom-control-label">Mitsubishi 
				  	<b className="badge badge-pill badge-light float-right">35</b> </div>
				</label>
				<label className="custom-control custom-checkbox">
				  <input type="checkbox"  className="custom-control-input"/>
				  <div className="custom-control-label">Nissan 
				  	<b className="badge badge-pill badge-light float-right">89</b> </div>
				</label>
				<label className="custom-control custom-checkbox">
				  <input type="checkbox" className="custom-control-input"/>
				  <div className="custom-control-label">Honda 
				  	<b className="badge badge-pill badge-light float-right">30</b>  </div>
				</label>
	</div> 
		</div>
	</article> 
	<article className="filter-group">
		<header className="card-header">
			<a href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="">
				<i className="icon-control fa fa-chevron-down"></i>
				<h6 className="title">Price range </h6>
			</a>
		</header>
		<div className="filter-content collapse show" id="collapse_3" >
			<div className="card-body">
				<input type="range" className="custom-range" min="0" max="100" name=""/>
				<div className="form-row">
				<div className="form-group col-md-6">
				  <label>Min</label>
				  <input className="form-control" placeholder="$0" type="number"/>
				</div>
				<div className="form-group text-right col-md-6">
				  <label>Max</label>
				  <input className="form-control" placeholder="$1,0000" type="number"/>
				</div>
				</div> 
				<button className="btn btn-block btn-primary">Apply</button>
			</div>
		</div>
	</article>
	<article className="filter-group">
		<header className="card-header">
			<a href="#" data-toggle="collapse" data-target="#collapse_4" aria-expanded="true" className="">
				<i className="icon-control fa fa-chevron-down"></i>
				<h6 className="title">Sizes </h6>
			</a>
		</header>
		<div className="filter-content collapse show" id="collapse_4" >
			<div className="card-body">
			  <label className="checkbox-btn">
			    <input type="checkbox"/>
			    <span className="btn btn-light"> XS </span>
			  </label>

			  <label className="checkbox-btn">
			    <input type="checkbox"/>
			    <span className="btn btn-light"> SM </span>
			  </label>

			  <label className="checkbox-btn">
			    <input type="checkbox"/>
			    <span className="btn btn-light"> LG </span>
			  </label>

			  <label className="checkbox-btn">
			    <input type="checkbox"/>
			    <span className="btn btn-light"> XXL </span>
			  </label>
		</div>
		</div>
	</article> 
	<article className="filter-group">
		<header className="card-header">
			<a href="#" data-toggle="collapse" data-target="#collapse_5" aria-expanded="false" className="">
				<i className="icon-control fa fa-chevron-down"></i>
				<h6 className="title">More filter </h6>
			</a>
		</header>
		<div className="filter-content collapse in" id="collapse_5" >
			<div className="card-body">
				<label className="custom-control custom-radio">
				  <input type="radio" name="myfilter_radio"  className="custom-control-input"/>
				  <div className="custom-control-label">Any condition</div>
				</label>

				<label className="custom-control custom-radio">
				  <input type="radio" name="myfilter_radio" className="custom-control-input"/>
				  <div className="custom-control-label">Brand new </div>
				</label>

				<label className="custom-control custom-radio">
				  <input type="radio" name="myfilter_radio" className="custom-control-input"/>
				  <div className="custom-control-label">Used items</div>
				</label>

				<label className="custom-control custom-radio">
				  <input type="radio" name="myfilter_radio" className="custom-control-input"/>
				  <div className="custom-control-label">Very old</div>
				</label>
			</div>
		</div>
	</article> 
</div> 

      </aside>*/