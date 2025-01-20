import React, { useEffect, useState } from "react";
import axios from "axios";
import GraficoCategorias from "../Components/GraficoCategorias"; // Importamos el componente del gráfico
import { definiciones } from "./KTH/TextosNiveles";
import { exportarJSONaTXT } from "./respuestas";

export default function Formualrio2() {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [seleccionados, setSeleccionados] = useState({});
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("CRL");
  const [categorias, setCategorias] = useState([]);
  const [definicionSeleccionada, setDefinicionSeleccionada] = useState("");
  let link = "http://localhost:5150/all";

  const [graficoData, setGraficoData] = useState({
    labels: [], // Categorías
    datasets: [
      {
        label: "Categorías completadas",
        data: [], // Valores
        backgroundColor: "rgb(47, 152, 65)",
        borderColor: "rgb(0, 0, 0)",
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        x: {
          grid: {
            color: "white", // Color de las líneas del eje X
          },
          ticks: {
            color: "white", // Color de las etiquetas del eje X
          },
        },
        y: {
          grid: {
            color: "white", // Color de las líneas del eje Y
          },
          ticks: {
            color: "white", // Color de las etiquetas del eje Y
          },
        },
      },
    },
  });

  const handleFiltrarPorCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);

    // Buscar la definición correspondiente en el array 'definiciones'
    const definicion = definiciones.find((item) => item[categoria]);

    if (definicion) {
      setDefinicionSeleccionada(definicion[categoria]);
    }
  };

  useEffect(() => {
    console.log(respuestas);
  }, [respuestas]);

  useEffect(() => {
    axios
      .get(link)
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

        // Extraer categorías únicas
        const categoriasUnicas = [
          ...new Set(response.data.map((item) => item.clave_categoria)),
        ];
        setCategorias(categoriasUnicas);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const handleRespuestaSeleccionada = (pregunta, alternativa, respuesta) => {
    setRespuestas((prevRespuestas) => ({
      ...prevRespuestas,
      [pregunta]: {
        ...prevRespuestas[pregunta],
        [alternativa]: respuesta,
      },
    }));

    setSeleccionados((prevSeleccionados) => ({
      ...prevSeleccionados,
      [`${pregunta}-${alternativa}`]: respuesta,
    }));
  };

  const todasRespuestasSeleccionadas = (pregunta) => {
    const alternativas = preguntas.find(
      (p) => p.texto_pregunta === pregunta
    )?.alternativas;
    if (!alternativas) return false;

    const respuestasPregunta = respuestas[pregunta] || {};
    return alternativas.every((alt) => respuestasPregunta[alt] === "Sí");
  };

  const preguntasFiltradas =
    categoriaSeleccionada === null
      ? preguntas
      : preguntas.filter(
          (pregunta) => pregunta.clave_categoria === categoriaSeleccionada
        );

  // Generar datos para el gráfico
  useEffect(() => {
    const categoriasCompletadas = categorias.map((categoria) => {
      const preguntasPorCategoria = preguntas.filter(
        (pregunta) => pregunta.clave_categoria === categoria
      );

      // Contamos cuántas preguntas tienen todas las respuestas como "Sí"
      const preguntasCompletadas = preguntasPorCategoria.filter((pregunta) =>
        todasRespuestasSeleccionadas(pregunta.texto_pregunta)
      ).length;

      return preguntasCompletadas;
    });

    setGraficoData((prevData) => ({
      ...prevData,
      labels: categorias,
      datasets: [
        {
          ...prevData.datasets[0],
          data: categoriasCompletadas,
        },
      ],
    }));
  }, [respuestas, categorias, preguntas]);

  return (
    <div style={{ scale: "95%" }} className="flex">
      {/* Filtro de categorías */}
      <div className="w-full p-4  mb-4">
        <h3 className="font-bold text-lg">Filtrar por categoría</h3>
        <div className="flex space-x-20 sc">
          {categorias.map((categoria, index) => (
            <button
              style={{ scale: "155%" }}
              key={index}
              onClick={() => handleFiltrarPorCategoria(categoria)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              {categoria}
            </button>
          ))}
        </div>
        <br></br>

        {/* Mostrar la definición de la categoría seleccionada */}
        {definicionSeleccionada && (
          <div
            style={{ marginRight: "100px" }}
            className="mt-4 p-4 bg-gray-100 rounded"
          >
            <h4 className="font-bold">Definición:</h4>
            <p>{definicionSeleccionada}</p>
          </div>
        )}

        {/* Mostrar gráfico de categorías completadas */}
        <GraficoCategorias graficoData={graficoData} />

        <div>
          {/* <h1>Exportar JSON a TXT</h1> */}
          <button
            style={{ color: "white", backgroundColor: "red" }}
            onClick={() => exportarJSONaTXT("datos_proyecto", respuestas)}
          >
            Descargar TXT
          </button>
        </div>
      </div>

      {/* Mostrar preguntas filtradas */}
      <div
        className="w-full p-4 bg-gray-200"
        style={{ maxHeight: "850px", overflowY: "auto" }}
      >
        {preguntasFiltradas.map((pregunta, index) => (
          <div key={index} className="mb-4">
            <div style={{ backgroundColor: "lightblue", fontSize: "20px" }}>
              <h3>{pregunta.texto_pregunta}</h3>
            </div>

            <ul>
              {pregunta.alternativas.map((alternativa, idx) => {
                const respuestaSeleccionada =
                  seleccionados[`${pregunta.texto_pregunta}-${alternativa}`];
                return (
                  <li key={idx} className="mb-2">
                    {alternativa}
                    <div>
                      <button
                        onClick={() =>
                          handleRespuestaSeleccionada(
                            pregunta.texto_pregunta,
                            alternativa,
                            "Sí"
                          )
                        }
                        className={`mr-2 p-2 rounded ${
                          respuestaSeleccionada === "Sí"
                            ? "bg-green-700"
                            : "bg-green-500"
                        } text-white`}
                      >
                        Sí
                      </button>
                      <button
                        onClick={() =>
                          handleRespuestaSeleccionada(
                            pregunta.texto_pregunta,
                            alternativa,
                            "No"
                          )
                        }
                        className={`p-2 rounded ${
                          respuestaSeleccionada === "No"
                            ? "bg-red-700"
                            : "bg-red-500"
                        } text-white`}
                      >
                        No
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
