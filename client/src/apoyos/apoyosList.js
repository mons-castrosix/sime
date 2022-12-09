import React, { useState } from 'react';
import Axios from 'axios';
import { BrowserRouter, NavLink, Routes, Route,Switch,Link } from 'react-router-dom';
import './apoyos.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
function ApoyosList(){
   
    const [list,setList]=useState([])
    const getList=()=>{
        Axios.get(//"http://localhost:3001/apoyos"
        "http://54.219.124.66:3001/apoyos"
        ).then((response) =>{
          setList(response.data)
          console.log(response)
        });
      }
    return(
        <div className="container">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/fontawesome.min.css" integrity="sha512-giQeaPns4lQTBMRpOOHsYnGw1tGVzbAIHUyHRgn7+6FmiEgGGjaG0T2LZJmAPMzRCl+Cug0ItQ2xDZpTmEc+CQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            <div className='apoyos'>
            <div className="container">
            
                <div className="table-responsive">
                    <div className="table-wrapper">			
                        <div className="table-title">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-xs-4">
                                    <div className="show-entries">
                                        <span>Ver</span>
                                        <select>
                                            <option>5</option>
                                            <option>10</option>
                                            <option>15</option>
                                            <option>20</option>
                                        </select>
                                        <span>Entradas</span>
                                    </div>						
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <h2 className="text-center">Lista de <b>Apoyos</b></h2>
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-4">
                                    <div className="search-box">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="material-icons">&#xE8B6;</i></span>
                                            <input type="text" className="form-control" placeholder="Search&hellip;"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                
                                <div className="col-lg-6 col-md-4">
                                    
                                </div>
                                <div className="col-lg-6 col-md-4 col-xs-4">
                                    <div className="search">
                                        <div className="input">
                                            
                                            <Link to='/apoyos/add-apoyo' className="btn btn-block" type="submit"><i class="fa-solid fa-plus pl"></i>Nuevo</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>A. Paterno <i className="fa fa-sort"></i></th>
                                    <th>A. Materno</th>
                                    <th>Nombres <i className="fa fa-sort"></i></th>
                                    <th>Clave de Elector</th>
                                    <th>Curp<i className="fa fa-sort"></i></th>
                                    <th>Sección</th>
                                </tr>
                            </thead>
                            <tbody>
                            {getList()}
                            {list.map((val,key)=>{
                                    return <tr>
                                    <td>{val.id}</td>
                                    <td>{val.apaterno}</td>
                                    <td>{val.amaterno}</td>
                                    <td>{val.nombres}</td>
                                    <td>{val.clave_elector}</td>
                                    <td>{val.curp}</td>
                                    <td>
                                        <a className="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a>
                                        <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                        <a className="delet" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                                    </td>
                                </tr>
                                    
                                    
                                    
                                    
                                    
                                    
                                })}
                                
                                
                                
                                
                            </tbody>
                        </table>
                        <div className="clearfix">
                            <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                            <ul className="pagination">
                                <li className="page-item disabled"><a >Previous</a></li>
                                <li className="page-item"><a className="page-link">1</a></li>
                                <li className="page-item"><a className="page-link">2</a></li>
                                <li className="page-item active"><a className="page-link">3</a></li>
                                <li className="page-item"><a  className="page-link">4</a></li>
                                <li className="page-item"><a  className="page-link">5</a></li>
                                <li className="page-item"><a  className="page-link">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>        
</div> 

            
    </div>
        </div>
    );
}

export default ApoyosList;