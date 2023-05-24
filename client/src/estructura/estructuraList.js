import React, { useState, useRef } from 'react';
import Axios from 'axios';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BrowserRouter, NavLink, Routes, Route, Switch, Link, usena } from 'react-router-dom';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

import Header from '../header/header';
import { useNavigate } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';

//core
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';

function EstructuraList() {
    const [id, setId] = useState(0);
    const [list, setList] = useState([])
    const [listDF, setListDF] = useState([])

    const navigate = useNavigate();
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
    const getList = () => {
        Axios.post(//"http://localhost:3001/estructura"
            "http://54.219.124.66:3001/apoyos"
        ).then((response) => {
            //FILTRAR CAMPOS PARA TABLA
            var resultado = JSON.stringify(response.data);
            var empObj = JSON.parse(resultado);
            var id = "";
            empObj.forEach((item) => {
                Object.entries(item).forEach(([key, val]) => {
                    if (key == "id") {
                        id = JSON.stringify(val);
                        //console.log(`key-${key}-val-${JSON.stringify(val)}`)
                    }

                });
                Object.assign(item, { ver: <Link className='view' to={""} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link> });
                Object.assign(item, { editar: <Link className='edit' to={"" } title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link> })
                Object.assign(item, { eliminar: <Link className='delet' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setId(id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link> })

            });
            //console.log("objeto"+JSON.stringify(empObj))
            setList(empObj)

            console.log("LIST:  "+list)
            //console.log(response.data)

        });
    }
    

    var arr = [];
    const reformattedArray = list.map((val, key) => { { arr.push("df", val.distrito_federal) } });
    var distf = JSON.stringify(arr)


    const deleteApoyo = (id) => {
        Axios.delete(/*"http://localhost:3001/deleteEstructura/"*/"http://54.219.124.66:3001/deleteEstructura" + id).then(() => {
            //alert("ELIMINADO")
            navigate('/estructura')
        })

    }
    const atras = () => {
        let path = '/estructura';
        navigate(path);
    }
    const nuevo = () => {
        let path = '/estructura/add/';
        navigate(path);
    }
    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'nombre', header: 'Nombre Completo' },
        { field: 'clave_electoral', header: 'Clave Electoral' },
        { field: 'nombre_equipo', header: 'Equipo' },

      

    ];
    const exportCSV = () => {
        dt.current.exportCSV();
    };
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <h3 style={{ color: 'black' }}>Lista de Estructura</h3>
            </div>
        );
    };
    const rightToolbarTemplate = () => {
        return <Button label="Agregar" icon="pi pi-plus"  rounded severity='info' onClick={nuevo} className="mr-2" />
            ;
    };
    const exportColumns = columns.map((col) => ({ title: col.header, dataKey: col.field }));
    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, list);
                doc.save('estructura.pdf');
            });
        });
    };
    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(list);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'estructura');
        });
    };
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
        
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
    
        _filters["global"].value = value;
    
        setFilters(_filters);
        setGlobalFilterValue(value);
        
      };
    const header = (
        <div>

        
            <div className='row'>
                <div className='col-8'>
                <div className="flex align-items-center justify-content-end gap-4">
                <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            </div>
                </div>
                <div className='col-4'>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Buscar"
          />
                    </span>
                </div>

            </div></div>

    );

    const representativesItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">

                <span>{option}</span>
            </div>
        );
    };

    const representativeRowFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options}
                options={distf}
                itemTemplate={representativesItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                optionLabel="name"
                placeholder="Any"
                className="p-column-filter"
                maxSelectedLabels={1}
                style={{ minWidth: '14rem' }}
            />
        );
    };
    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.distrito_federal;

        return (
            <div className="flex align-items-center gap-2">
                <span>{representative}</span>
            </div>
        );
    };
    const headerGroup = (<ColumnGroup>
        <Row>
            <Column header="" colSpan={3}></Column>
            <Column header="Acciones" colSpan={2}></Column>
            
        </Row>
        <Row>
            <Column header="Nombre Completo"></Column>
            <Column header="Clave Electoral"></Column>
        
            <Column header="Equipo"></Column>
            
            <Column header="ver"></Column>
            <Column header="eliminar"></Column>
        </Row>
    </ColumnGroup>);
    return (

        <div>

            <Header></Header>

            

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/fontawesome.min.css" integrity="sha512-giQeaPns4lQTBMRpOOHsYnGw1tGVzbAIHUyHRgn7+6FmiEgGGjaG0T2LZJmAPMzRCl+Cug0ItQ2xDZpTmEc+CQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous" />
                {getList()}
                <div className='row'>
                <div className='col-md-1'></div>
                    <div className="col-md-10">
                        
                        <div className="table-responsive">
                            <div className="table-wrapper">

                                <div className="card">
                                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                                    <DataTable
                                        ref={dt}
                                        value={list}
                                        paginator
                                        rows={10}
                                        headerColumnGroup={headerGroup}
                                        resizableColumns showGridlines
                                        rowsPerPageOptions={[5, 10, 25]}
                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                        currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords} registros"
                                        tableStyle={{ minWidth: '50rem' }}
                                        globalFilterFields={['nombre','clave_electoral','nombre_equipo']}
                                        filters={filters}
                                        header={header}>
                                        
                                        <Column field="nombre" header="Nombre Completo" style={{ minWidth: '12rem' }} />
                                        <Column field="clave_electoral" header="Clave Electoral" style={{ minWidth: '12rem' }} />
                                    
                                        <Column field="nombre_equipo" header="Equipo" style={{ minWidth: '12rem' }} />
                                        <Column field="ver" header="Ver" style={{ minWidth: '8rem' }} />
                                        <Column field="eliminar" header="Eliminar" style={{ minWidth: '8rem' }} />

                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-1'></div>


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
                                <button type="button" className="btn btn-primary " data-bs-dismiss="modal" aria-label="Close" onClick={() => { deleteApoyo(id) }}>Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}



export default EstructuraList;

/*<ScriptTag isHydrating={true} type="text/javascript"
        src=
        "https://code.jquery.com/jquery-3.5.1.js" />
        <ScriptTag isHydrating={true} type="text/javascript"
        src=
        "https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js" />
      <ScriptTag isHydrating={true} type="text/javascript"
        src=
        "https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap4.min.js" />
       
*/