import React, { useState } from 'react';
import { GoogleMap, KmlLayer, LoadScript, InfoWindow, Marker, Polyline, Rectangle } from '@react-google-maps/api';
import config from './config.json';
import './maps.css';
import Axios from 'axios';
import Header from '../header/header';

const mapContainerStyle = {
	width: '74vw', height: '98vh'
};
const divStyle = {
	background: `white`,

	width: '100px',
	height: '50px',
	fontSize: '10px'
}

const option = {

	mapTypeControl: true,
	scaleControl: true,
	streetViewControl: true,
	fullscreenControl: true,
	clickableIcons: true,
	streetViewPanorama: true,
};
const optionMap = {
	clickable: true,
	preserveViewport: true,
	screenOverlays: true,
	suppressInfoWindows: false
}
const center = {
	lat: 19.2130929078429,
	lng: -101.09697103412132
};

const onLoad = rectangle => {
	console.log('rectangle: ', rectangle)
}

const onClick = click => {
	console.log('click: ', click.featureData
	)
}


/*
const onMouseOver = mouse =>{
  console.log('mouse:',mouse.latLng)
}*/


function Example() {
	const [infoWindowOpen, setInfoWindowOpen] = useState(false);
	const [peopleInfo, setPeopleInfo] = useState([]);
	const [list, setList] = useState([]);
	const [value, setValue] = useState("")
	const [icono, setIcono] = useState("")
	const persona = 'Persona 1';
	const showInfoWindow = () => {
		setInfoWindowOpen(true);

	};
	const positions = [

		{ id: 1, persona: 'Persona 1', lat: 19.913155136181825, lng: -100.23615130148286 },
		{ id: 2, persona: 'Persona 2', lat: 18.366740952284204, lng: -103.22443253484077 },
		{ id: 3, persona: 'Persona 3', lat: 18.891671319236345, lng: -101.48948911409637 },
		{ id: 4, persona: 'Persona 4', lat: 19.415765302281212, lng: -102.17613461808484 },
		{ id: 5, persona: 'Persona 5', lat: 18.53788658093323, lng: -100.88524107058647 },
		{ id: 6, persona: 'Persona 6', lat: 18.579546646656805, lng: -102.5606561003184 },
		{ id: 7, persona: 'Persona 7', lat: 19.984643366831122, lng: -102.09373715760623 },
		{ id: 8, persona: 'Persona 8', lat: 20.041419403995963, lng: -102.85728695804143 },
		{ id: 9, persona: 'Persona 9', lat: 19.679769251135365, lng: -101.57737973860688 },
		{ id: 10, persona: 'Persona 10', lat: 18.798094529403937, lng: -101.28624204491577 },


	];

	const getList = () => {
		if (value == "apoyos") {
			Axios.post("http://localhost:3001/mapa-apoyos"
				//"http://54.219.124.66:3001/mapa-apoyos"
			).then((response) => {
				setList(response.data)
				//console.log(response);
			});
		}
		if (value == "estructura") {
			Axios.post("http://localhost:3001/mapa-estructura"
				//"http://54.219.124.66:3001/mapa-estructura"
			).then((response) => {
				setList(response.data)
				//	console.log(response);
			});
		}

	};

	return (
		<div >
			<Header></Header>

			<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
			<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
			<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous" />
			<link href="https://cdn.datatables.net/v/dt/dt-1.13.4/datatables.min.css" rel="stylesheet" />
			<script src="https://cdn.datatables.net/v/dt/dt-1.13.4/datatables.min.js"></script>

			<div className="row">
				<div className="col-4" >
					<div className="card " >
						<div className="card-header text-center text-center text-white font-weight-bold">
							GEOREFERENCIAR REGISTROS EN MAPA
						</div>
						<div className="card-body rounded-3  text-center bg-light">
							{getList()}

							<label className="custom-control custom-checkbox">
								<input
									type="checkbox"
									className="custom-control-input"
									onChange={(e) => {
										if (e.target.checked) {
											setValue("estructura");
											setIcono('http://maps.google.com/mapfiles/kml/paddle/blu-blank.png')
										}
									}}

									value="Estructura"
								/>
								<div className="custom-control-label">Estructura
								</div>
							</label>
							<label className="custom-control custom-checkbox">
								<input
									type="checkbox"
									className="custom-control-input"
									onChange={(e) => {
										if (e.target.checked) {
											setValue("apoyos");
											setIcono("http://maps.google.com/mapfiles/kml/paddle/grn-blank.png")
										}
									}}

									value="Estructura"
								/>
								<div className="custom-control-label">Apoyos
								</div>
							</label>

						</div>
					</div>

				</div>
				<div className="col-8" >

					
<LoadScript googleMapsApiKey={config.GOOGLE_MAP_API_KEY}>
						<GoogleMap
							id="rectangle-example"
							mapContainerStyle={mapContainerStyle}
							zoom={13}
							
							center={center}
							options={option}
							
						>
							{list.map(val => {
								return (<Marker
									key={`marker-${val.id}`}
									onLoad={onLoad}
									position={{ lat: parseFloat(val.lat), lng:parseFloat( val.lng )}}
									label={val.persona}
									onClick={showInfoWindow}
									icon={icono} 
									draggable={true}
									onDragEnd={(e) => { console.log('dragEnd', e.nativeEvent.coordinate) }}
								>

									{/*persona == val.persona*/
										infoWindowOpen && (
											<InfoWindow
												key={`marker-${val.id}`}
												visible={true}

												onCloseClick={() => setInfoWindowOpen(false)}>
												<div style={divStyle}>{val.nombre}</div>
											</InfoWindow>
										)}
								</Marker>);
							})}



							<KmlLayer
								url='https://drive.google.com/uc?export=download&id=19WoaZD0MxNq-7GE6c-hKYDkkZyDWns0d'
								onClick={onClick}
								options={option}
							>

							</KmlLayer>

						</GoogleMap>
					</LoadScript>



				</div>
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