
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

  return (
    <div>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossOrigin="anonymous" />

      <Header></Header> <br></br> <br></br> <br></br> 
      <div className='row'>
        <div className='col-6'>
          <div class="card">
            <div class="card-header">
              Apoyos por dia
            </div>
            <div class="card-body">
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


  )
}

export default Dashboard;