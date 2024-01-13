"use client";
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ seriesData }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Net Profit',
        data: seriesData || [44, 55, 45, 57, 56, 61, 58],
        
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 200,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          distributed: true, 
          borderRadius: 5,
          horizontal: false,
          columnWidth: '40%',
          endingShape: 'rounded',
        },
      },
     colors: (() => {
        const currentDay = new Date().getDay();
        const color = Array.from({ length: 7 }, (_, i) => (currentDay === i ? '#663399' : '#90949d'));
        console.log(color)
        return color
      })(),
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
      xaxis: {
        categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        axisBorder: {
          show: false,
        },
      
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: {
          show:false
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      grid: {
        show: false,
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
