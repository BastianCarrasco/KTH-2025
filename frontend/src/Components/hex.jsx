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

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getColorByValue = (value) => {
  if (value === 1) {
    return "rgb(255, 0, 0)"; // Rojo
  } else if (value >= 2 && value <= 3) {
    return "rgb(255, 255, 0)"; // Amarillo
  } else if (value >= 4 && value <= 7) {
    return "rgb(144, 238, 144)"; // Verde claro
  } else if (value >= 8 && value <= 9) {
    return "rgb(21, 190, 21)"; // Verde oscuro
  }
  return "rgb(255, 255, 255)"; // Blanco (por defecto)
};

const BarChart = ({ niveles }) => {
  // Preparar los datos para el gráfico de barras
  const labels = Object.keys(niveles);
  const dataValues = Object.values(niveles);

  const chartData = {
    labels: labels, // Los niveles (categorías) serán las etiquetas del eje X
    datasets: [
      {
        label: "Nivel de Proyectos",
        data: dataValues, // Los valores de cada nivel
        backgroundColor: dataValues.map((valor) => getColorByValue(valor)),
        borderColor: dataValues.map((valor) => getColorByValue(valor)),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
