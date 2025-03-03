import React, { useState } from "react";
import { investigador } from "./investigadores";

const Docentes = () => {
  const [busqueda, setBusqueda] = useState("");
  const [escuelaFiltro, setEscuelaFiltro] = useState("");

  // Filtrar los investigadores según el nombre y la escuela
  const filteredInvestigadores = investigador.filter((investigador) => {
    const nombreCoincide = investigador.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const escuelaCoincide =
      escuelaFiltro === "" || investigador.escuela === escuelaFiltro;
    return nombreCoincide && escuelaCoincide;
  });

  // Obtener las escuelas únicas para el filtro
  const escuelas = [...new Set(investigador.map((inv) => inv.escuela))];

  return (
    <div className="p-4">
      {/* Filtros */}
      <div className="mb-6 flex justify-between">
        {/* Filtro por Escuela */}
        <select
          className="p-2 border rounded"
          value={escuelaFiltro}
          onChange={(e) => setEscuelaFiltro(e.target.value)}
        >
          <option value="">Filtrar por Escuela</option>
          {escuelas.map((escuela, index) => (
            <option key={index} value={escuela}>
              {escuela}
            </option>
          ))}
        </select>

        {/* Filtro por Nombre */}
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Buscar por nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInvestigadores.map((investigador, index) => (
          <div
            key={index}
            className="flex bg-gray-100 rounded-lg shadow-md p-4"
          >
            {/* Columna Izquierda */}
            <div className="flex flex-col w-1/3">
              <div className="bg-blue-500 rounded-full p-3 mb-4 flex justify-center items-center">
                {/* Ícono Representativo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 10-8 0v4m12 2a4 4 0 11-8 0m8 0H4m4 0v6m8-6v6"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-center">
                {investigador.nombre}
              </h2>
              <p className="text-gray-500 text-center">
                {investigador.escuela}
              </p>
              <p className="text-sm text-gray-700 text-center">
                {investigador.cargo}
              </p>
            </div>

            {/* Columna Derecha */}
            <div className="w-2/3 pl-4">
              <p>
                <strong>Tipo de Contrato:</strong> {investigador.tipoContrato}
              </p>
              <p>
                <strong>Línea de Investigación:</strong>{" "}
                {investigador.lineaInvestigacion}
              </p>
              <p>
                <strong>Proyectos Finalizados:</strong>{" "}
                {investigador.proyectosFinalizados.join(", ")}
              </p>
              <p>
                <strong>Proyectos Vigentes:</strong>{" "}
                {investigador.proyectosVigentes.join(", ")}
              </p>
              <p>
                <strong>Pregrado:</strong> {investigador.pregrado}
              </p>
              <p>
                <strong>Postgrado:</strong> {investigador.postgrado}
              </p>
              <p>
                <strong>Contacto:</strong> {investigador.contacto}
              </p>
              <p>
                <strong>Apoyos:</strong> {investigador.apoyos}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Docentes;
