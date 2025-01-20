import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

// Función que genera los datos del gráfico
const getRadarChartData = (niveles) => {
  const labels = Object.keys(niveles);
  const data = Object.values(niveles);

  return {
    labels: labels,
    datasets: [
      {
        label: "Niveles",
        data: data,
        backgroundColor: "rgba(15, 83, 26, 0.2)",
        borderColor: "rgb(8, 168, 0)",
        borderWidth: 2,
      },
    ],
    options: {
      scales: {
        r: {
          ticks: {
            font: {
              size: 25,
            },
          },
          angleLines: {
            display: true,
          },
          suggestedMin: 0,
          suggestedMax: 30,
        },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 25,
            },
          },
        },
        tooltip: {
          titleFont: {
            size: 25,
          },
          bodyFont: {
            size: 25,
          },
        },
      },
    },
  };
};

// Componente principal
export default function RadarChart({ niveles }) {
  return (
    <div>
      <Radar
        style={{ width: "100%", height: "100%", fontSize: "100%" }}
        data={getRadarChartData(niveles)}
      />
    </div>
  );
}
