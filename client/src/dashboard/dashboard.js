
import Header from '../header/header';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import React from 'react';
import Chart from "react-apexcharts";
import "./material-dashboard.css";

const Dashboard = () => {
  const series = [ //data on the y-axis
    {
      name: "Temperature in Celsius",
      data: [100, 80, 30, 20, 15]
    }
  ];
  const options = { //data on the x-axis
    chart: { id: 'bar-chart' },
    xaxis: {
      categories: ["1263", "2710", "2722", "2729", "2748",]
    }
  };

  const series2 = [
    {
      name: 'Actual',
      data: [
        {
          x: '2011',
          y: 1292,
          goals: [
            {
              name: 'Expected',
              value: 1400,
              strokeHeight: 5,
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: '2012',
          y: 4432,
          goals: [
            {
              name: 'Expected',
              value: 5400,
              strokeHeight: 5,
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: '2013',
          y: 5423,
          goals: [
            {
              name: 'Expected',
              value: 5200,
              strokeHeight: 5,
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: '2014',
          y: 6653,
          goals: [
            {
              name: 'Expected',
              value: 6500,
              strokeHeight: 5,
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: '2015',
          y: 8133,
          goals: [
            {
              name: 'Expected',
              value: 6600,
              strokeHeight: 13,
              strokeWidth: 0,
              strokeLineCap: 'round',
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: '2016',
          y: 7132,
          goals: [
            {
              name: 'Expected',
              value: 7500,
              strokeHeight: 5,
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: '2017',
          y: 7332,
          goals: [
            {
              name: 'Expected',
              value: 8700,
              strokeHeight: 5,
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: '2018',
          y: 6553,
          goals: [
            {
              name: 'Expected',
              value: 7300,
              strokeHeight: 2,
              strokeDashArray: 2,
              strokeColor: '#775DD0'
            }
          ]
        }
      ]
    }
  ];
  const options2 = {
    chart: {
      height: 350,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        columnWidth: '60%'
      }
    },
    colors: ['#00E396'],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Actual', 'Expected'],
      markers: {
        fillColors: ['#00E396', '#775DD0']
      }
    }
  }
  const series3 = [44, 55, 13, 43, 22]
  const options3 = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['PAN', 'PRI', 'PRD', 'MORENA', 'PT'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous" />

      <Header></Header> <br></br>

     
      <div className="container-fluid">


        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
            className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
        </div>

        <div className="row">


          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Clientes registrados</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">443</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Clientes que compraron</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">421</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasa de cierre de venta
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">95.03%</div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div className="progress-bar bg-info" role="progressbar"
                           
                            aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Satisfacciòn promedio</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="row">

          <div className="col-xl-8 col-lg-7">
            <div className="card shadow mb-4">

              <div
                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-white">Apoyos totales por secciòn</h6>
                <div className="dropdown no-arrow">
                  <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink">
                    <div className="dropdown-header">Dropdown Header:</div>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
              </div>

              <div className="card-body">
              <div className="row sparkboxes mt-4 mb-4">
                <div className="col-md-12">
                  <div className="box box1">
                    <h3>Apoyos totales por sección</h3>
                    <Chart
                      options={options}
                      series={series}
                      type="bar"
                      width="450"
                    />
                  </div>
                </div>
                
              </div>
              </div>
            </div>
          </div>


          <div className="col-xl-4 col-lg-5">
            <div className="card shadow mb-4">

              <div
                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-white">Metas de votación</h6>
                <div className="dropdown no-arrow">
                  <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink">
                    <div className="dropdown-header">Dropdown Header:</div>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
              </div>

              <div className="card-body">
              <div className="row sparkboxes mt-4 mb-4">
                
                <div className="col-md-4">
                  <div className="box box2">
                    
                    <Chart
                      options={options2}
                      series={series2}
                      type="bar"
                      width="450"
                    />
                  </div>
                </div>
                
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">


          <div className="col-lg-6 mb-4">


            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-white">Projects</h6>
              </div>
              <div className="card-body">
                <h4 className="small font-weight-bold">Server Migration <span
                  className="float-right">20%</span></h4>
                <div className="progress mb-4">
                  <div className="progress-bar bg-danger" role="progressbar" 
                    aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h4 className="small font-weight-bold">Sales Tracking <span
                  className="float-right">40%</span></h4>
                <div className="progress mb-4">
                  <div className="progress-bar bg-warning" role="progressbar" 
                    aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h4 className="small font-weight-bold">Customer Database <span
                  className="float-right">60%</span></h4>
                <div className="progress mb-4">
                  <div className="progress-bar" role="progressbar"
                    aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h4 className="small font-weight-bold">Payout Details <span
                  className="float-right">80%</span></h4>
                <div className="progress mb-4">
                  <div className="progress-bar bg-info" role="progressbar" 
                    aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h4 className="small font-weight-bold">Account Setup <span
                  className="float-right">Complete!</span></h4>
                <div className="progress">
                  <div className="progress-bar bg-success" role="progressbar"
                    aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>


           

          </div>

          <div className="col-lg-6 mb-4">


            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-white">Porcentaje de votación</h6>
              </div>
              <div className="card-body">
              <div className="row sparkboxes mt-4 mb-4">
               
               
                <div className="col-md-4">
                  <div className="box box3">
                    
                    <Chart
                      options={options3}
                      series={series3}
                      type="pie"
                      width="450"
                    />
                  </div>
                </div>
              </div>
              </div>
            </div>


            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
              </div>
              <div className="card-body">
                <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce
                  CSS bloat and poor page performance. Custom CSS classes are used to create
                  custom components and custom utility classes.</p>
                <p className="mb-0">Before working with this theme, you should become familiar with the
                  Bootstrap framework, especially the utility classes.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>


  )
}

export default Dashboard;