// LineChart.tsx
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



interface LineChartProps {
  data: {
    labels: Date[];
    datasets: {
      label: string;
      data: number[];
      fill?: boolean;
      borderColor?: string;
    }[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  // Chart options with a time scale for the x-axis
  const options = {
    responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Health Chart',
    },
  },
  };

  return (
    <Line
      data={data}
      options={options}
    />
  );
};

export default LineChart;
