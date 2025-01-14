import React, { useState } from "react";
import { CRL } from "./TextosNiveles";

const Niveles = () => {
  const [mostrarNiveles, setMostrarNiveles] = useState(false);

  const toggleNiveles = () => {
    setMostrarNiveles(!mostrarNiveles);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Customer Readiness Level - CRL
      </h1>
      <button
        onClick={toggleNiveles}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        {mostrarNiveles ? "Ocultar CRL" : "Mostrar CRL"}
      </button>

      {mostrarNiveles && (
        <div className="mt-6 flex items-start">
          {/* Termómetro */}
          <div className="relative flex flex-col items-center">
            <div className="w-16 rounded-full bg-gray-200 overflow-hidden">
              {Object.entries(CRL[0]).map(([key, value], index, array) => {
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
                    <span className="text-sm text-white font-bold">
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
            {Object.entries(CRL[0]).map(([key, value]) => (
              <div key={key} className="mb-4">
                <h2 className="text-lg font-bold">{key.toUpperCase()}</h2>
                <p className="text-sm text-gray-700">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Niveles;
