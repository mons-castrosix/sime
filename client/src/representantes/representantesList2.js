import React, { useState, useRef } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BrowserRouter, NavLink, Routes, Route, Switch, Link, usena } from 'react-router-dom';

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

function RepresentantesList2() {
    const [id, setId] = useState(0);
    const [list, setList] = useState([])
    const [listDF, setListDF] = useState([])
    const [list2, setList2] = useState([])
    const navigate = useNavigate();
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
    const getList = () => {
        Axios.post("http://localhost:3001/representantes2"
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
                        //console.log(`key-${key}-val-${JSON.stringify(val)}`)
                    }

                });
                Object.assign(item, { ver: <Link className='view' to={""} title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></Link> });
                Object.assign(item, { editar: <Link className='edit' to={""} title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></Link> })
                Object.assign(item, { eliminar: <Link className='delet' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { deleteR(id) }} title="Delete"><i className="material-icons">&#xE872;</i></Link> })

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


    const deleteR = (id) => {
     



        Swal.fire({
            title: '¿Estás seguro de eliminar este registro?',
            text: 'No se podrán revertir los cambios',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'De acuerdo',
            cancelButtonText: 'Cancelar',

        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(/*"http://54.219.124.66:3001/deleteApoyo/"+id*/"http://localhost:3001/deleteR2/" + id ).then(() => {
                    Swal.fire({
                        title: 'Registro representante de casilla',
                        text: 'eliminado correctamente',
                        icon: 'success',
                        confirmButtonText: 'De acuerdo'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/representantes-casilla');
                        }
                    }).catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'De acuerdo'
                        })
                    });
                })
            }
        });


    }
    const atras = () => {
        let path = '/apoyos';
        navigate(path);
    }
    const nuevo = () => {
        let path = '/representantes/add/';
        navigate(path);
    }
    const columns = [

        { field: 'nombre', header: 'Nombre Completo' },
        { field: 'no_celular', header: 'Núm. de celular' },
        { field: 'tipocasilla', header: 'Tipo Casilla' },



    ];
    const exportCSV = () => {
        dt.current.exportCSV();
    };
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <h3 style={{ color: 'black' }}>Lista de Representantes de Casilla</h3>
            </div>
        );
    };
    const rightToolbarTemplate = () => {
        return <Button severity='info' label="Agregar" id='agregaApoyo' icon="pi pi-plus" rounded onClick={nuevo} className="mr-2" />
            ;
    };
    const exportColumns = columns.map((col) => ({ title: col.header, dataKey: col.field }));
    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, list);
                doc.save('lideres_territoriales.pdf');
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

            saveAsExcelFile(excelBuffer, 'list');
        });
    };
    const header = (
        <div>

            <div className="flex align-items-center justify-content-end gap-2">
                <Button type="button" id='copy' icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                <Button type="button" id='excel' icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                <Button type="button" id='pdf' icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            </div>
            <div className='row'>
                <div className='col-8'>
                    <h4 className="m-0"></h4>
                </div>
                <div className='col-4'>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            type="search"
                            onInput={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
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

    const headerGroup = (<ColumnGroup>
        <Row>
            <Column header="" colSpan={3}></Column>

            <Column header="Acciones" colSpan={2} style={{ paddingLeft: '35px' }}></Column>

        </Row>
        <Row>
            <Column header="Nombre Completo"></Column>
            <Column header="Núm de Celular"></Column>
            <Column header="Tipo Casilla"></Column>


            <Column header="ver"></Column>
            <Column header="editar"></Column>
        </Row>
    </ColumnGroup>);
    return (

        <div>

            <Header></Header>

            <div className="container">

             
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <div className='apoyos'>

                    <div className="container">
                        {getList()}


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
                                        globalFilterFields={['']}
                                        header={header}>
                                        <Column field="nombre" header="Nombre Completo" style={{ minWidth: '12rem' }} />
                                        <Column field="no_celular" header="Núm. de celular" style={{ minWidth: '12rem' }} />
                                        <Column field="tipocasilla" header="Tipo Casilla" style={{ minWidth: '7rem' }} />

                                        <Column field="ver" header="Ver" style={{ minWidth: '4rem' }} />
                                        <Column field="eliminar" header="Eliminar" style={{ minWidth: '4rem' }} />

                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
               
            </div></div>
    );
}



export default RepresentantesList2;