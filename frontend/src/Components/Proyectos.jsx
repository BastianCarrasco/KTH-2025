import React, { useState } from "react";
import { proyectos } from "./proyectos_data";
import { investigador } from "./investigadores";
import ScatterHexagonalChart from "./hex";
import ProjectFormModal from "./ProjectFormModal";
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

import AntenasImg from "../assets/Antenas con aplicaciones satelitales Impresas con tecnología 3D.JPG";

// Register chart.js components
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

const Proyectos = () => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [claves, setClaves] = useState({});

  const verificarClaveYAbrirProyecto = (index) => {
    if (claves[index] === "tuClaveSegura" || claves[index] === "12345") {
      handleProyectoClick(index);
    } else {
      alert("Clave incorrecta");
    }
  };

  const handleProyectoClick = (index) => {
    setProyectoSeleccionado(proyectos[index]);
  };

  // Filtrar investigadores que coincidan con los del proyecto seleccionado
  const getInvestigadoresDelProyecto = () => {
    if (proyectoSeleccionado) {
      const investigadores = [];
      investigador.forEach((inv) => {
        if (inv.nombre === proyectoSeleccionado.investigador) {
          investigadores.push({ ...inv, tipo: "Investigador" });
        }
      });

      proyectoSeleccionado.colaboradores.forEach((colab) => {
        investigador.forEach((inv) => {
          if (inv.nombre === colab) {
            investigadores.push({ ...inv, tipo: "Colaborador" });
          }
        });
      });

      return investigadores;
    }
    return [];
  };

  const handleClaveChange = (index, value) => {
    setClaves({ ...claves, [index]: value });
  };

  // Radar chart data
  const getRadarChartData = () => {
    if (!proyectoSeleccionado) return {};

    const labels = Object.keys(proyectoSeleccionado.niveles);
    const data = Object.values(proyectoSeleccionado.niveles);

    return {
      labels: labels,
      datasets: [
        {
          label: "Niveles",
          data: data,
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div style={{ color: "white" }} className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div>
          <ProjectFormModal></ProjectFormModal>
          <h2 className="text-xl font-semibold mb-4">Proyectos</h2>
          <div className="grid grid-cols-1 gap-4">
            {proyectos.map((proyecto, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-md text-left"
              >
                <h3 className="text-lg font-semibold">{proyecto.titulo}</h3>
                <p className="text-sm text-gray-600">{proyecto.tecnologia}</p>
                <input
                  style={{ color: "black" }}
                  type="password"
                  value={claves[index] || ""}
                  onChange={(e) => handleClaveChange(index, e.target.value)}
                  placeholder="Ingresa la clave"
                  className="mt-2 p-2 border rounded"
                />
                <button
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                  onClick={() => verificarClaveYAbrirProyecto(index)}
                >
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        </div>

        {proyectoSeleccionado && (
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              Detalles del Proyecto
            </h2>

            <div className="border rounded-lg p-4 shadow-md">
              <h1
                style={{ textAlign: "center", fontSize: "25px" }}
                className="text-xl font-semibold mb-2"
              >
                {proyectoSeleccionado.titulo}
              </h1>

              {proyectoSeleccionado.titulo ===
                "Antenas con aplicaciones satelitales Impresas con tecnología 3D" && (
                <img
                  src={AntenasImg}
                  alt={proyectoSeleccionado.titulo}
                  className="w-1/4 h-auto rounded-lg mb-4 mx-auto"
                />
              )}

              <h3 className="text-lg font-semibold mb-2">Niveles</h3>
              <table className="table-auto w-full border-collapse border border-gray-300 text-center">
                <thead>
                  <tr>
                    {Object.keys(proyectoSeleccionado.niveles).map(
                      (nivel, idx) => (
                        <th key={idx} className="border border-gray-300 p-2">
                          {nivel}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.values(proyectoSeleccionado.niveles).map(
                      (valor, idx) => (
                        <td
                          key={idx}
                          className="border border-gray-300 p-2"
                          style={{
                            backgroundColor: getColorByValue(valor),
                            color: "black",
                          }}
                        >
                          {valor}
                        </td>
                      )
                    )}
                  </tr>
                </tbody>
              </table>
              <br />

              <table className="table-auto w-full border-collapse border border-gray-300 text-left mb-4">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">
                      Investigador/a (UA)
                    </td>
                    <td className="border border-gray-300 p-2">
                      {proyectoSeleccionado.investigador}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">
                      Colaborador/a (UA)
                    </td>
                    <td className="border border-gray-300 p-2">
                      {proyectoSeleccionado.colaboradores.join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">
                      Invenciones
                    </td>
                    <td className="border border-gray-300 p-2">
                      {proyectoSeleccionado.invenciones}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">
                      Financiamiento
                    </td>
                    <td className="border border-gray-300 p-2">
                      {proyectoSeleccionado.financiamiento}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">
                      Industria/Disciplina
                    </td>
                    <td className="border border-gray-300 p-2">
                      {proyectoSeleccionado.industria.join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium">
                      Empresa/Entidad
                    </td>
                    <td className="border border-gray-300 p-2">
                      {proyectoSeleccionado.empresa}
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-lg font-semibold mb-2">
                Investigadores Relacionados
              </h3>
              <ul>
                {getInvestigadoresDelProyecto().map((investigador, idx) => (
                  <li
                    key={idx}
                    className="border-b border-gray-300 p-4 flex items-start space-x-4"
                  >
                    <div className="flex-1">
                      <table className="table-auto w-full text-left">
                        <tbody>
                          <tr>
                            <td className="font-medium p-2">Nombre:</td>
                            <td className="p-2">{investigador.nombre}</td>
                          </tr>
                          <tr>
                            <td className="font-medium p-2">Cargo:</td>
                            <td className="p-2">{investigador.cargo}</td>
                          </tr>
                          <tr>
                            <td className="font-medium p-2">Escuela:</td>
                            <td className="p-2">{investigador.escuela}</td>
                          </tr>
                          <tr>
                            <td className="font-medium p-2">
                              Área de Investigación:
                            </td>
                            <td className="p-2">
                              {investigador.lineaInvestigacion}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-medium p-2">Contacto:</td>
                            <td className="p-2">{investigador.contacto}</td>
                          </tr>
                          <tr>
                            <td className="font-medium p-2">
                              Proyectos vigentes:
                            </td>
                            <td className="p-2">
                              {investigador.proyectosVigentes.join(", ")}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-medium p-2">
                              Proyectos finalizados:
                            </td>
                            <td className="p-2">
                              {investigador.proyectosFinalizados.join(", ")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={investigador.foto}
                        alt={investigador.nombre}
                        className="w-full h-full rounded-full"
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-2">GRAFICOS</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <div style={{ width: "50%", height: "400px" }}>
                  <Radar
                    data={getRadarChartData()}
                    options={{ responsive: true }}
                  />
                </div>

                <div style={{ width: "50%", height: "400px" }}>
                  <ScatterHexagonalChart
                    niveles={proyectoSeleccionado.niveles}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proyectos;
