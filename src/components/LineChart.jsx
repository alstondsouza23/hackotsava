// src/components/LineChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

// Register required components (Chart.js v4 needs explicit registration)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false, // let the container control height
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Line Chart Example" }
  },
  elements: {
    line: { tension: 0.4 } // smooth curves
  }
};

const defaultData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Visitors",
      data: [65, 59, 80, 81, 56, 75],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      pointRadius: 4
    }
  ]
};

export default function LineChart({ data = defaultData, options = defaultOptions, style }) {
  return (
    <div style={{ width: "100%", height: style?.height ?? 300 }}>
      <Line data={data} options={options} />
    </div>
  );
}
