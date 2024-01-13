"use client"
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ seriesData }) => {
 
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Net Profit',
        data: seriesData || [44, 55,45, 57, 56, 61, 58],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 200,
        toolbar:{
          show:false
        }
       
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          horizontal: false,
          columnWidth: '40%',
          endingShape: 'rounded',
          // colors:(function(){
          //   const defaultColor = '#000';
          //   const juneColor = 'red';
          //   const currentDay = new Date().getDay();
          //  return Array.from({length:7},(_,i)=>i === currentDay? juneColor : defaultColor)
          // })
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        
      },
      xaxis: {
        categories: ['S','M', 'T', 'W', 'T', 'F', 's'],
        axisBorder: {
          show: false, // Hide x-axis line
        },
        axisTicks: {
          show: false, // Hide x-axis ticks
        },
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
        axisBorder: {
          show: false, // Hide y-axis line
        },
        labels:{
          show:false
        }
      },
      grid:{
        show:false,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={200} />
    </div>
  );
};

export default ApexChart;
