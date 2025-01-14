import React, { useState } from "react";
import { CRL, TRL, BRL, IPRL, TmRL, FRL } from "./TextosNiveles";

const Niveles = () => {
  const [mostrarCRL, setMostrarCRL] = useState(false);
  const [mostrarTRL, setMostrarTRL] = useState(false);
  const [mostrarBRL, setMostrarBRL] = useState(false);
  const [mostrarIPRL, setMostrarIPRL] = useState(false);
  const [mostrarTmRL, setMostrarTmRL] = useState(false);
  const [mostrarFRL, setMostrarFRL] = useState(false);

  const aregloSeters = [
    setMostrarBRL,
    setMostrarCRL,
    setMostrarFRL,
    setMostrarIPRL,
    setMostrarTRL,
    setMostrarTmRL,
  ];

  function setearSigla(n) {
    aregloSeters.forEach((setter, index) => {
      if (index !== n) {
        setter(false); // Pone a false todos los setters excepto el que corresponde a la posición n
      }
    });
  }

  const toggleTRL = () => {
    setMostrarTRL(!mostrarTRL);
    setearSigla(4);
  };
  const toggleCRL = () => {
    setMostrarCRL(!mostrarCRL);
    setearSigla(1);
  };
  const toggleBRL = () => {
    setMostrarBRL(!mostrarBRL);
    setearSigla(0);
  };
  const toggleIPRL = () => {
    setMostrarIPRL(!mostrarIPRL);
    setearSigla(3);
  };
  const toggleTmRL = () => {
    setMostrarTmRL(!mostrarTmRL);
    setearSigla(5);
  };
  const toggleFRL = () => {
    setMostrarFRL(!mostrarFRL);
    setearSigla(2);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Niveles de Preparación
      </h1>
      <div className="flex space-x-4">
        <button
          onClick={toggleCRL}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          {mostrarCRL ? "Ocultar CRL" : "Mostrar CRL"}
        </button>
        <button
          onClick={toggleTRL}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          {mostrarTRL ? "Ocultar TRL" : "Mostrar TRL"}
        </button>
        <button
          onClick={toggleBRL}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          {mostrarBRL ? "Ocultar BRL" : "Mostrar BRL"}
        </button>
        <button
          onClick={toggleIPRL}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          {mostrarIPRL ? "Ocultar IPRL" : "Mostrar IPRL"}
        </button>
        <button
          onClick={toggleTmRL}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          {mostrarTmRL ? "Ocultar TmRL" : "Mostrar TmRL"}
        </button>
        <button
          onClick={toggleFRL}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          {mostrarFRL ? "Ocultar FRL" : "Mostrar FRL"}
        </button>
      </div>

      {(mostrarCRL ||
        mostrarTRL ||
        mostrarBRL ||
        mostrarIPRL ||
        mostrarTmRL ||
        mostrarFRL) && (
        <div className="mt-6 flex items-start">
          {/* Termómetro */}
          <div className="relative flex flex-col items-center">
            <div className="w-16 rounded-full bg-gray-200 overflow-hidden">
              {Object.entries(
                mostrarCRL
                  ? CRL[0]
                  : mostrarTRL
                  ? TRL[0]
                  : mostrarBRL
                  ? BRL[0]
                  : mostrarIPRL
                  ? IPRL[0]
                  : mostrarTmRL
                  ? TmRL[0]
                  : FRL[0]
              ).map(([key, value], index, array) => {
                const gradientColor = `hsl(${
                  (120 / (array.length - 1)) * (array.length - index - 1)
                }, 100%, 50%)`; // Rojo a verde
                return (
                  <div
                    key={key}
                    className="flex items-center justify-center"
                    style={{
                      backgroundColor: gradientColor,
                      height: "60px", // Altura incrementada para alargar el termómetro
                      borderBottom:
                        index === array.length - 1 ? "none" : "1px solid white",
                    }}
                  >
                    <span className="text-lg text-white font-bold">
                      {key.toUpperCase()}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="w-16 h-16 bg-red-600 rounded-full mt-2"></div>
          </div>

          {/* Descripciones */}
          <div className="ml-8">
            {Object.entries(
              mostrarCRL
                ? CRL[0]
                : mostrarTRL
                ? TRL[0]
                : mostrarBRL
                ? BRL[0]
                : mostrarIPRL
                ? IPRL[0]
                : mostrarTmRL
                ? TmRL[0]
                : FRL[0]
            ).map(([key, value]) => (
              <div key={key} className="mb-4">
                <h2 className="text-xl font-bold">{key.toUpperCase()}</h2>
                <p
                  style={{ fontSize: "20px" }}
                  className="text-sm text-black-700"
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Niveles;
