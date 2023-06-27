import React from 'react';
import './login.css'
import mape from './GeoMapa.png'
import mapemorena from './mape_morena.png'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

function Login() {
  
  return (
    <div id="body">
      <div className="login-box">

      <img className="avatar" src={mapemorena} alt="logo MAPE"/>
      <h1>MAPE</h1>
      <form>
        
          <label htmlFor="username">Usuario</label>
          <input type="text" placeholder="Inserta tu usuario"/>

        
          <label htmlFor="Password">Contraseña</label>
          <input type="Password" placeholder="Inserta tu contraseña"/>

          <NavLink to='/inicio' id="login"  className="btn btn-danger">Iniciar sesion</NavLink> <br></br>

          <a href="#">Olvide mi contraseña</a><br/>
      </form>
    </div> 
   </div>
     

        );
}

        export default Login;
