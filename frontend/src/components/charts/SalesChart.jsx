/* chart.js - JavaScript open library for web charts.
react-chartjs-2 - A React wrapper for Chart.js; provide React components for supported Chart.js to deploy in React environment.
Multiaxis Line Chart.
 */
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Biểu đồ Doanh số và Đơn hàng",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Doanh số",
      data: [12, 45, 68, 45, 23, 44],
      borderColor: "green",
      backgroundColor: "lighter green",
    },
    {
      label: "Đơn hàng",
      data: [12, 5, 9, 45, 78, 4],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function SalesChart() {
  return <Line options={options} data={data} />;
}
