import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface HealthEntry {
    Date: string;
    Height: number;
    Weight: number;
    FatPercentage: number;
    MusclePercentage: number;
    WaterPercentage: number;
}

interface HealthChartProps {
    data: HealthEntry[];
}

const HealthChart: React.FC<HealthChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.Date),
    datasets: [
      {
        label: 'Height',
        data: data.map(entry => entry.Height),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Weight',
        data: data.map(entry => entry.Weight),
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Fat Percentage',
        data: data.map(entry => entry.FatPercentage),
        borderColor: 'rgba(255,206,86,1)',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Muscle Percentage',
        data: data.map(entry => entry.MusclePercentage),
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Water Percentage',
        data: data.map(entry => entry.WaterPercentage),
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HealthChart;
