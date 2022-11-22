import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './header.css'

function Header(){
    return(
        
        
        <div className='header'>
       
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Roboto:wght@500;700&display=swap" rel="stylesheet"/>
        
          
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet"/>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"/>
        
        
            <link href="lib/animate/animate.min.css" rel="stylesheet"/>
            <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet"></link>
                
            
        <nav className="navbar navbar-expand-lg sticky-top p-0 px-4 px-lg-5">
            <a href='!#' className="navbar-brand d-flex align-items-center">
                <h2 className="m-0 nombrepartido"><img className="img-fluid me-2"  alt="" />Sistema Territorial</h2>
            </a>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-4 py-lg-0">
                    <a href='!#'  className="nav-item nav-link active">Modulo 1</a>
                    <a href='!#' className="nav-item nav-link">Modulo 2</a>
                    <a href='!#' className="nav-item nav-link">Modulo 3</a>
                    <a href='!#' className="nav-item nav-link">Modulo 4</a>
                    <div className="nav-item dropdown">
                        <a href='!#' className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Modulo 5</a>
                        <div className="dropdown-menu shadow-sm m-0">
                            <a href='!#'  className="dropdown-item">Submodulo 1</a>
                            <a href='!#' className="dropdown-item">Submodulo 2</a>
                            <a href='!#'  className="dropdown-item">Submodulo 3</a>
                            <a href='!#' className="dropdown-item">Submodulo 4</a>
                        </div>
                    </div>
                    <a href='!#' className="nav-item nav-link">Modulo 6</a>
                </div>
                
            </div>
        </nav>
        
    
        </div>
    );
}

export default Header;