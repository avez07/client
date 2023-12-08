import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Progess by month',
    },
  },
  
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// Manually create sample data
const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [400, 300, 600, 200, 800, 700, 500], // Manually set data points
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.8)',
    },
    {
      label: 'Dataset 2',
      data: [700, 500, 300, 600, 400, 200, 900], // Manually set data points
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.8)',
    },
  ],
};

const LineChart = () => {
  return <Line options={options} data={data} />;
};

export default LineChart;
