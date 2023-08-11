import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './login/login';
import Apoyos from './apoyos/apoyos';
import ApoyosList from './apoyos/apoyosList';
import EditApp from './apoyos/editApoyo';
import Map from './maps/example';
import ViewAp from './apoyos/viewApoyo';
import Dashboard from './dashboard/dashboard';
import Lideres from './lideresTerritoriales/lideres';
import ViewLideres from './lideresTerritoriales/lideresView';
import LideresList from './lideresTerritoriales/lideresTerritorialesList';
import Resultados from './maps/resultadosElectorales';
import reportWebVitals from './reportWebVitals';
import Estructura from './estructura/estructura';
import EstructuraList from './estructura/estructuraList';
import RepresentantesList2 from './representantes/representantesList2';
import { BrowserRouter, NavLink, Routes, Route, Switch } from 'react-router-dom';
import Representantes from './representantes/representantes';
import RepresentantesList from './representantes/representantesList';
import Promotores from './promotores/promotores';
import PromotoresList from './promotores/promotoresList';
import Promovidos from './promovidos/promovidos';
import PromovidosList from './promovidos/promovidosList';
import ViewEstructura from './estructura/viewEstructura';
import ViewPromotores from './promotores/viewPromotores';
import ViewPromovidos from './promovidos/viewPromovidos';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
   
   <BrowserRouter> 
           
           <Routes>
                <Route index path='/' element={<Login/>} />
                <Route index path='/inicio' element={<Dashboard/>} />

                 <Route path='/apoyos' element={<ApoyosList/>} />
                 <Route path='/apoyos/add-apoyo' element={<Apoyos/>} />
                 <Route name="view-apoyo" path='/apoyos/view-apoyo/:id' element={<ViewAp/>} />
                 <Route path='/mapa' element={<Map/>} />
                 <Route path='/apoyos/edit-apoyo/:id' element={<EditApp/>}></Route>

                 <Route path='/mapa/resultados-electorales-2021' element={<Resultados/>}></Route> 

                 <Route path='/lideres' element={<LideresList/>} />
                 <Route path='/lideres/add' element={<Lideres/>} />
                 <Route path='/lideres/view/:id' element={<ViewLideres/>} />

                 <Route path='/estructura' element={<EstructuraList/>} />
                 <Route path='/estructura/add' element={<Estructura/>} />
                 <Route path='/estructura/view/:id' element={<ViewEstructura/>} />

                 <Route path='/promotores' element={<PromotoresList/>} />
                 <Route path='/promotores/add' element={<Promotores/>} />
                 <Route path='/promotores/view/:id' element={<ViewPromotores/>} />

                 <Route path='/promovidos' element={<PromovidosList/>} />
                 <Route path='/promovidos/add' element={<Promovidos/>} />
                 <Route path='/promovidos/view/:id' element={<ViewPromovidos/>} />


                 <Route path='/representantes-generales' element={<RepresentantesList/>} />
                 <Route path='/representantes-casilla' element={<RepresentantesList2/>} />
                 <Route path='/representantes/add' element={<Representantes/>} />

           </Routes>
         </BrowserRouter>
  

  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
