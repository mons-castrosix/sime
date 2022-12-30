import React from 'react';
import Header from './header/header';
import Apoyos from './apoyos/apoyos';
import ApoyosList from './apoyos/apoyosList';
import Example from './maps/example';
import { BrowserRouter, NavLink, Routes, Route,Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  
  return (
    <div>
        <BrowserRouter> 
          <Header></Header>
          <Routes>
                <Route path='/apoyos' element={<ApoyosList/>} />
                <Route path='/apoyos/add-apoyo' element={<Apoyos/>} />
          </Routes>
        </BrowserRouter> 
        <Example></Example>
        
        
        
      
   
    </div>
    
    
    
    
    
    
    
    
    
      
    
    
  );
}

export default App;
