
import Header from '../header/header';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import React from 'react';
import Chart from "react-apexcharts";

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
      categories: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
    }
  };

const series2= [
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
const options2= {
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
const series3= [44, 55, 13, 43, 22]
const options3= {
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

      <Header></Header> <br></br> <br></br> <br></br>
      
      <div id="wrapper">
      <div class="content-area">
        <div class="container-fluid"><h3>Dashboard</h3> <hr></hr>
          <div class="text-right mt-3 mb-3 d-fixed">
          
            
              
           
          </div>
          <div class="main">
            <div class="row sparkboxes mt-4 mb-4">
              <div class="col-md-4">
                <div class="box box1">
                <h3>Apoyos por dia</h3>
                <Chart
            options={options}
            series={series}
            type="bar"
            width="450"
          />
                </div>
              </div>
              <div class="col-md-4">
                <div class="box box2">
                <h2>Resultados por año</h2>
                <Chart
            options={options2}
            series={series2}
            type="bar"
            width="450"
          />
                </div>
              </div>
              <div class="col-md-4">
                <div class="box box3">
                <h2>Porcentaje de votación</h2>
                <Chart
            options={options3}
            series={series3}
            type="pie"
            width="450"
          />
                </div>
              </div>
            </div>

            <div class="row mt-5 mb-4">
              <div class="col-md-6">
                <div class="box">
                  <div id="bar"></div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="box">
                  <div id="donut"></div>
                </div>
              </div>
            </div>

            <div class="row mt-4 mb-4">
              <div class="col-md-6">
                <div class="box">
                  <div id="area"></div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="box">
                  <div id="line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>


  )
}

export default Dashboard;