import React from 'react';
import Header from './header/header';
import Apoyos from './apoyos/apoyos';
import ApoyosList from './apoyos/apoyosList';
import EditApp from './apoyos/editApoyo';
import Map from './maps/example';
import ViewAp from './apoyos/viewApoyo';
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
                <Route name="view-apoyo" path='/apoyos/view-apoyo/:id' element={<ViewAp/>} />
                <Route path='/mapa' element={<Map/>} />
                <Route path='/apoyos/edit-apoyo/:id' element={<EditApp/>}></Route>
              
          </Routes>
        </BrowserRouter> 
        
        
        

      
   
    </div>
    
    
    
    
    
    
    
    
    
      
    
    
  );
}

export default App;
