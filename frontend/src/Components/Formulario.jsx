import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-chartjs-2";

const Formulario = () => {
  const [progreso, setProgreso] = useState(0);

  const [valores, setValores] = useState({
    TRL: 0,
    CRL: 0,
    BRL: 0,
    FRL: 0,
    IPRL: 0,
    TEAM: 0,
  });
  const [respondidas, setRespondidas] = useState({});
  const [preguntas, setPreguntas] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("TRL");

  useEffect(() => {
    axios
      .get("http://localhost:5150/all")
      .then((response) => {
        const datosAgrupados = response.data.reduce((acc, curr) => {
          const preguntaExistente = acc.find(
            (item) => item.texto_pregunta === curr.texto_pregunta
          );

          if (preguntaExistente) {
            preguntaExistente.alternativas.push(curr.texto_alter);
          } else {
            acc.push({
              texto_pregunta: curr.texto_pregunta,
              alternativas: [curr.texto_alter],
              clave_categoria: curr.clave_categoria,
            });
          }
          return acc;
        }, []);
        setPreguntas(datosAgrupados);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const manejarRespuesta = (
    categoria,
    preguntaIndex,
    alternativaIndex,
    esSi
  ) => {
    // Registrar la respuesta
    setRespondidas((prevRespondidas) => ({
      ...prevRespondidas,
      [`${categoria}-${preguntaIndex}-${alternativaIndex}`]: esSi,
    }));

    // Verificar si todas las respuestas son 'Sí'
    const pregunta = preguntas[preguntaIndex];
    const todasRespuestasSi = pregunta.alternativas.every(
      (_, index) =>
        respondidas[`${categoria}-${preguntaIndex}-${index}`] || esSi
    );

    if (todasRespuestasSi) {
      setValores((prevValores) => ({
        ...prevValores,
        [categoria]: preguntaIndex + 1, // Setear el valor igual al número de la pregunta
      }));
    }

    const totalAlternativas = preguntas.reduce(
      (total, pregunta) =>
        pregunta.clave_categoria === categoria
          ? total + pregunta.alternativas.length
          : total,
      0
    );

    const alternativasRespondidas = Object.keys(respondidas).filter(
      (key) => key.startsWith(categoria) && respondidas[key]
    ).length;

    const nuevoProgreso = (alternativasRespondidas / totalAlternativas) * 100;
    setProgreso(Math.min(nuevoProgreso, 100));
  };

  const preguntasFiltradas = categoriaSeleccionada
    ? preguntas.filter(
        (pregunta) => pregunta.clave_categoria === categoriaSeleccionada
      )
    : preguntas;

  const calcularProgresoCategoria = (categoria) => {
    const totalAlternativas = preguntas.reduce(
      (total, pregunta) =>
        pregunta.clave_categoria === categoria
          ? total + pregunta.alternativas.length
          : total,
      0
    );

    const alternativasRespondidas = Object.keys(respondidas).filter(
      (key) => key.startsWith(categoria) && respondidas[key]
    ).length;

    return (alternativasRespondidas / totalAlternativas) * 100;
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-6">
      {/* Sección izquierda (Preguntas y alternativas) */}
      <div className="col-span-7 p-4 bg-white rounded-lg shadow-md overflow-y-auto ">
        <div className="sticky top-0 z-10 bg-white p-4">
          <div className="mb-4 flex gap-2 justify-center">
            {["TRL", "CRL", "BRL", "FRL", "IPRL", "TEAM"].map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaSeleccionada(categoria)}
                className={`px-4 py-2 rounded ${
                  categoriaSeleccionada === categoria
                    ? "bg-blue-900"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-y-scroll max-h-[70vh]">
          {preguntasFiltradas.map((pregunta, preguntaIndex) => (
            <div key={preguntaIndex} className="mb-4">
              <div style={{ backgroundColor: "lightblue", fontSize: "24px" }}>
                <p className="mb-2 font-medium">{pregunta.texto_pregunta}</p>
              </div>

              {pregunta.alternativas.map((alternativa, alternativaIndex) => (
                <div key={alternativaIndex} className="mb-2">
                  <p className="mb-2">{alternativa}</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        manejarRespuesta(
                          pregunta.clave_categoria,
                          preguntaIndex,
                          alternativaIndex,
                          true
                        )
                      }
                      className={`px-4 py-2 rounded ${
                        respondidas[
                          `${pregunta.clave_categoria}-${preguntaIndex}-${alternativaIndex}`
                        ]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      Sí
                    </button>
                    <button
                      onClick={() =>
                        manejarRespuesta(
                          pregunta.clave_categoria,
                          preguntaIndex,
                          alternativaIndex,
                          false
                        )
                      }
                      className={`px-4 py-2 rounded ${
                        respondidas[
                          `${pregunta.clave_categoria}-${preguntaIndex}-${alternativaIndex}`
                        ]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Sección derecha (Gráfico y barras de progreso) */}
      <div className="col-span-5 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Progreso</h2>
        {["TRL", "CRL", "BRL", "FRL", "IPRL", "TEAM"].map((categoria) => (
          <div key={categoria} className="mb-4">
            <p className="font-medium">{categoria}</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{
                  width: `${calcularProgresoCategoria(categoria)}%`,
                }}
              ></div>
            </div>
          </div>
        ))}

        <h2 className="text-xl font-bold mb-4">Gráfico</h2>
        <Chart
          type="bar"
          data={{
            labels: ["TRL", "CRL", "BRL", "FRL", "IPRL", "TEAM"],
            datasets: [
              {
                label: "Puntuación",
                data: Object.values(valores),
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                  "#FF9F40",
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Formulario;
