import React, { useState } from 'react';
import Axios from 'axios';
import { BrowserRouter, NavLink, Routes, Route,Switch,Link, usena} from 'react-router-dom';
import './apoyoList.css';

import { useNavigate } from 'react-router-dom';
function ApoyosList(){
    const [id, setId] = useState(0);
    const [list,setList]=useState([])
    const navigate=useNavigate();
    const getList=()=>{
        Axios.post(//"http://localhost:3001/apoyos"
        "http://54.219.124.66:3001/apoyos"
        ).then((response) =>{
          setList(response.data)
          
        });
      }
      const deleteApoyo =(id) =>{
        Axios.delete("http://54.219.124.66:3001/deleteApoyo/"+id).then(()=>{
            //alert("ELIMINADO")
            navigate('/apoyos')
        })

      }
      const atras = () =>{ 
        let path = '/apoyos'; 
        navigate(path);
      }
    return(

        
        <div className="container">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/fontawesome.min.css" integrity="sha512-giQeaPns4lQTBMRpOOHsYnGw1tGVzbAIHUyHRgn7+6FmiEgGGjaG0T2LZJmAPMzRCl+Cug0ItQ2xDZpTmEc+CQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous"/>
            <div className='apoyos'>
                <div className="container">
                
                    <div className="table-responsive">
                        <div className="table-wrapper">			
                            <div className="table-title">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-xs-4">
                                                    
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
                                                
                                                <Link to='/apoyos/add-apoyo' className="btn btn-block" type="submit">Agregar Apoyo</Link>
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
                                        
                                        return (<tr>
                                        <td>{val.id}</td>
                                        <td>{val.apaterno}</td>
                                        <td>{val.amaterno}</td>
                                        <td>{val.nombres}</td>
                                        <td>{val.clave_elector}</td>
                                        <td>{val.curp}</td>
                                        <td>
                                            <Link className="view" to={"/apoyos/view-apoyo/"+val.id}  title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link>
                                            <Link className="edit"  title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link>
                                            <Link className="delet" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setId(val.id)}} title="Delete"><i className="material-icons">&#xE872;</i></Link>
                                        </td>
                                    </tr>
                                        
                                        
                                        /*<Link className="edit" to={"/apoyos/edit-apoyo/"+val.id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link>*/
                                        
                                        
                                        
                                )})}
                                    
                                    
                                    
                                    
                                </tbody>
                            </table>
                            <div className="clearfix">
                                
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
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>¿Estás seguro de eliminar este registro?</p>
      </div>
      <div className="modal-footer">
        <button type="button" onClick={atras} className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary " data-bs-dismiss="modal" aria-label="Close" onClick={()=>{deleteApoyo(id)}}>Aceptar</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
}

export default ApoyosList;