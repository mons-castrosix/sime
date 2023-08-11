import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../assets/bootstrap-icons/bootstrap-icons.css'
import '../assets/boxicons/css/boxicons.min.css'
import './header.css'
import logo from './mape_morena.png'
import menu from './menu.png'
import Apoyos from '../apoyos/apoyos';
import $ from 'jquery'

function Header() {
    return (

        <div className='header'>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Roboto:wght@500;700&display=swap" rel="stylesheet" />

            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />




            <nav className="navbar navbar-expand-lg sticky-top p-0 px-4 px-lg-5">

                <NavLink to='/inicio' className="navbar-brand d-flex align-items-center">
                    <img src={logo} alt="..." width="65" className="mr-3 rounded-circle img-thumbnail shadow-sm" />
                    <div className="media-body">
                        <h4 className="m-0" style={{ color: 'white' }}>MAPE</h4>
                        <p style={{ color: 'white' }} className=" mb-0">Nombre del candidato</p>
                    </div>
                </NavLink>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"><img className='text-white' style={{ width: '32px' }} src={menu}></img></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-4 py-lg-0">
                        <NavLink to='/apoyos' className="nav-item nav-link ">Apoyos</NavLink>
                        <NavLink to='/lideres' className="nav-item nav-link ">Lideres Territoriales</NavLink>
                        <NavLink to='/estructura' className="nav-item nav-link ">Estructura</NavLink>
                        <NavLink to='/promotores' className="nav-item nav-link ">Promotores</NavLink>
                        <NavLink to='/promovidos' className="nav-item nav-link ">Promovidos</NavLink>

                        <div className="dropdown">
                            <a className="nav-item nav-link">Representantes <i className='fas fa-angle-down'></i></a>
                            <div className="dropdown-content">
                                <NavLink to='/representantes-generales' >Generales</NavLink>
                                <NavLink to='/representantes-casilla' >Casilla</NavLink>

        

                            </div>
                        </div>


                        <NavLink className="nav-item nav-link">Resultados Electorales</NavLink>
                        <NavLink className="nav-item nav-link ">Metas</NavLink>
                        <NavLink to='/mapa' className="nav-item nav-link ">Mapa</NavLink>

                    </div>

                </div>
            </nav>




        </div>


    );
}







/*
$(function () {
    // Sidebar toggle behavior
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
    });

});*/

export default Header;


/*
        <div className="vertical-nav bg-white" id="sidebar">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
            <div className="py-4 px-3 mb-4 bg-light">
                <div className="media d-flex align-items-center"><img src={logo} alt="..." width="65" className="mr-3 rounded-circle img-thumbnail shadow-sm" />


                    <div className="media-body">
                        <h4 className="m-0">MAPE</h4>
                        <p className="font-weight-light text-muted mb-0">PRD</p>
                    </div>
                </div>
            </div>



            <ul className="nav flex-column bg-white mb-0">
                <li className="nav-item">
                    <NavLink to='/apoyos' className="nav-item nav-link "><i className="bi bi-universal-access-circle icono"></i>  Apoyos</NavLink>

                </li>
                <li className="nav-item">
                    <NavLink to='' className="nav-item nav-link "><i className="bi bi-geo-fill icono"></i>  Lideres Territoriales</NavLink>

                </li>
                <li className="nav-item">
                    <NavLink to='' className="nav-item nav-link "><i className="bi bi-diagram-3-fill icono"></i> Estructura</NavLink>

                </li>
                <li className="nav-item">
                    <NavLink to='' className="nav-item nav-link "><i className="bi bi-person-video3 icono"></i> Promotores</NavLink>

                </li>
                <li className="nav-item">
                    <NavLink to='' className="nav-item nav-link "><i className="bi bi-person-video2 icono"></i> Promovidos</NavLink>

                </li>
                <li className="nav-item">
                    <NavLink to='' className="nav-item nav-link "><i className="bi bi-person-rolodex icono"></i> Representantes</NavLink>

                </li>
                <li className="nav-item">
                    <NavLink to='/mapa' className="nav-item nav-link "><i className="bi bi-card-checklist icono"></i>  Resultados electorales</NavLink>

                </li>
                <li className="nav-item">
                    <NavLink to='' className="nav-item nav-link "><i className="bi bi-bookmark-star icono"></i> Metas</NavLink>

                </li>
                <li className="nav-item">
                    <NavLink to='/mapa/resultados-electorales-2021' className="nav-item nav-link"><i className="bi bi-universal-access-circle icono"></i>  Resultados Electorales</NavLink>
                </li>

            </ul>


        </div>*/


/*<nav className="navbar navbar-expand-lg sticky-top p-0 px-4 px-lg-5">
            <a href='!#' className="navbar-brand d-flex align-items-center">
                <h2 className="m-0 nombrepartido">MAP-E</h2>
            </a>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-4 py-lg-0">
                    <NavLink to='/apoyos'  className="nav-item nav-link ">Apoyos</NavLink>
                    <NavLink to='/mapa'  className="nav-item nav-link ">Mapa</NavLink>
                    <a href='!#' className="nav-item nav-link">Promovidos</a>
                    <NavLink to='/mapa/resultados-electorales-2021'  className="nav-item nav-link">Resultados Electorales</NavLink>
                    <div className="nav-item dropdown">
                        <a href='!#' className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Bingo</a>
                        <div className="dropdown-menu shadow-sm m-0">
                            <a href='!#'  className="dropdown-item">Submodulo 1</a>
                            <a href='!#' className="dropdown-item">Submodulo 2</a>
                            <a href='!#'  className="dropdown-item">Submodulo 3</a>
                            <a href='!#' className="dropdown-item">Submodulo 4</a>
                        </div>
                    </div>
                    <a href='!#' className="nav-item nav-link">Modulo6</a>
                </div>
                
            </div>
        </nav>*/
/*<nav className="navbar navbar-expand-lg sticky-top p-0 px-4 px-lg-5">
    <a href='!#' className="navbar-brand d-flex align-items-center">
        <h2 className="m-0 nombrepartido">MAP-E</h2>
    </a>
    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-4 py-lg-0">
            <NavLink to='/apoyos'  className="nav-item nav-link ">Apoyos</NavLink>
            <NavLink to='/mapa'  className="nav-item nav-link ">Mapa</NavLink>
            <NavLink to='/mapa/resultados-electorales-2021'  className="nav-item nav-link">Resultados Electorales</NavLink>
           
        </div>
        
    </div>
</nav>*/


/*<p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Charts</p>

                <ul className="nav flex-column bg-white mb-0">
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark font-italic">
                            <i className="fa fa-area-chart mr-3 text-primary fa-fw"></i>
                            Area charts
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark font-italic">
                            <i className="fa fa-bar-chart mr-3 text-primary fa-fw"></i>
                            Bar charts
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark font-italic">
                            <i className="fa fa-pie-chart mr-3 text-primary fa-fw"></i>
                            Pie charts
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark font-italic">
                            <i className="fa fa-line-chart mr-3 text-primary fa-fw"></i>
                            Line charts
                        </a>
                    </li>
                </ul>*/