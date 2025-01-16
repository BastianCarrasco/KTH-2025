// src/components/GraficoCategorias.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registramos los componentes del gráfico de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraficoCategorias = ({ graficoData }) => {
  return (
    <div style={{ color: "white" }} className="w-full p-4 mt-4">
      <h3 className="font-bold text-lg">Gráfico de categorías completadas</h3>
      <Bar data={graficoData} />
    </div>
  );
};

export default GraficoCategorias;
