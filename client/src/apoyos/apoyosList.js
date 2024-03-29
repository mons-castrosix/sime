import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BrowserRouter, NavLink, Routes, Route, Switch, Link, usena } from 'react-router-dom';
import './apoyoList.css';
import Header from '../header/header';
import { useNavigate } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

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

function ApoyosList() {
    const [id, setId] = useState(0);
    const [list, setList] = useState([])
    const [listDF, setListDF] = useState([])
    const [list2, setList2] = useState([])
    const navigate = useNavigate();
    const [globalFilter, setGlobalFilter] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
    const dt = useRef(null);
    const getList = () => {
        Axios.post("http://localhost:3001/apoyos"
            //"http://54.219.124.66:3001/apoyos"
        ).then((response) => {
            //FILTRAR CAMPOS PARA TABLA
            var resultado = JSON.stringify(response.data);
            setList2(JSON.parse(resultado));
            var empObj = JSON.parse(resultado);
            var id = "";
            empObj.forEach((item) => {
                Object.entries(item).forEach(([key, val]) => {
                    if (key == "id") {
                        id = JSON.stringify(val);
                        Object.assign(item, { ver: <Link className='view' to={"/apoyos/view-apoyo/"+id}  title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link> });
                Object.assign(item, { editar: <Link className='edit' to={"/apoyos/edit-apoyo/"+id} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link> })
                Object.assign(item, { eliminar: <Link className='delet' data-bs-toggle="modal" onClick={() => { deleteApoyo(val) }} title="Delete"><i className="material-icons">&#xE872;</i></Link> })

                        //console.log(`key-${key}-val-${JSON.stringify(val)}`)
                    }

                });
                
            });
            //console.log("objeto"+JSON.stringify(empObj))
            setList(empObj)

            //console.log("LIST:  "+list)
            console.log(response.data)

        });
    }
    var arr = [];
    const reformattedArray = list.map((val, key) => { { arr.push("df", val.distrito_federal) } });
    var distf = JSON.stringify(arr)


    const deleteApoyo = (id) => {
        //alert(id);
        Swal.fire({
            title: '¿Estás seguro de eliminar este registro?',
            text: 'No se podrán revertir los cambios',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'De acuerdo',
            cancelButtonText:'Cancelar',
            
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(/*"http://54.219.124.66:3001/deleteApoyo/" + id */ "http://localhost:3001/deleteApoyo/" + id).then(() => {

                Swal.fire({
                    title: 'Registro apoyo',
                    text: 'eliminado correctamente',
                    icon: 'success',
                    confirmButtonText: 'De acuerdo'
                }).then((result) => {
                    if (result.isConfirmed) {
                     navigate('/apoyos');
                    }
                });
            }).catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'De acuerdo'
                })
            });
            }
        });
        
    }
    const atras = () => {
        let path = '/apoyos';
        navigate(path);
    }
    const nuevo = () => {
        let path = '/apoyos/add-apoyo';
        navigate(path);
    }
    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'nombre', header: 'Nombre Completo' },
        { field: 'tipo', header: 'Tipo de apoyo' },
        { field: 'alcance', header: 'Alcance de apoyo' },
        { field: 'seccion', header: 'Sección' },


    ];
    const exportCSV = () => {
        dt.current.exportCSV();
    };
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <h3 style={{ color: 'black' }}>Lista de Apoyos</h3>
            </div>
        );
    };
    const rightToolbarTemplate = () => {
        return <Button label="Agregar" id='agregaApoyo' rounded icon="pi pi-plus" onClick={nuevo} severity='info' className="mr-2" />
            ;
    };
    const exportColumns = columns.map((col) => ({ title: col.header, dataKey: col.field }));
    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, list);
                doc.save('apoyos.pdf');
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

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(list2);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'apoyos');
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
  
 
    const [selectedCities, setSelectedCities] = useState(null);
    const header = (
        <div>


            <div className='row'>
                <div className='col-8'>
                    <div className="flex align-items-center justify-content-end gap-4">
                        <Button type="button" id='copy' icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                        <Button type="button" id='excel' icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                        <Button type="button" id='pdf' icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
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
            <Column header="" colSpan={4}></Column>
            <Column  header="Acciones" style={{ paddingLeft: '125px' }} colSpan={3}></Column>

        </Row>
        <Row>
            <Column header="Nombre Completo"></Column>
            <Column header="Tipo de apoyo"></Column>
            <Column header="Alcance de apoyo"></Column>
            <Column header="Sección"></Column>
            <Column header="Ver"></Column>
            <Column header="Editar"></Column>
            <Column header="Eliminar"></Column>
        </Row>
    </ColumnGroup>);
    return (

        <div>

            <Header></Header>



            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
           

            {getList()}
            <div className='row'>
                <div className='col-md-1'></div>
                <div className='col-md-10'>
                    <div className="table-responsive">
                        <div className="table-wrapper">

                            <div className="card rounded">
                                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                                <DataTable
                                    ref={dt}
                                    value={list}
                                    paginator
                                    rows={10}
                                    filters={filters}
                                    headerColumnGroup={headerGroup}
                                    resizableColumns showGridlines
                                    rowsPerPageOptions={[5, 10, 25]}
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords} registros"
                                    tableStyle={{ minWidth: '50rem' }}
                                    globalFilterFields={['nombre', 'tipo', 'alcance', 'seccion']}
                                    header={header}>
                                    <Column field="nombre" header="Nombre Completo" style={{ minWidth: '12rem' }} />
                                    <Column field="tipo" header="Tipo de apoyo" style={{ minWidth: '12rem' }} />
                                    <Column field="alcance" header="Alcance de apoyo" style={{ minWidth: '6rem' }} />
                                    <Column field="seccion" filterField="Sección" filter header="Distrito F" style={{ minWidth: '6rem' }} />

                                    <Column field="ver" header="Ver" style={{ minWidth: '4rem' }} />
                                    <Column field="editar" header="Editar" style={{ minWidth: '4rem' }} />
                                    <Column field="eliminar" header="Editar" style={{ minWidth: '4rem' }} />

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



export default ApoyosList;

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