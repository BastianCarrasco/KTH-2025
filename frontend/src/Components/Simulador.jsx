import { useState, useEffect } from "react";
import RadarChart from "./createRadarChartData ";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Simulador() {
  const [niveles, setNiveles] = useState({
    TRL: 0,
    CRL: 0,
    BRL: 0,
    FRL: 0,
    IPRL: 0,
    TEAM: 0,
  });

  const [preguntas, setPreguntas] = useState([]);
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [checkboxes, setCheckboxes] = useState({});
  const [showModal, setShowModal] = useState(true); // Estado para controlar la visibilidad de la modal

  const aumentarNivel = (nivel) => {
    setNiveles((prevState) => ({
      ...prevState,
      [nivel]: prevState[nivel],
    }));
    setNivelSeleccionado(nivel);
  };

  const fetchPreguntas = async () => {
    try {
      const response = await axios.get("http://localhost:5150/categoria");
      setPreguntas(response.data);
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
    }
  };

  useEffect(() => {
    fetchPreguntas();
  }, []);

  const preguntasFiltradas = preguntas.filter(
    (pregunta) => pregunta.nombre === nivelSeleccionado
  );

  const handleCheckboxChange = (preguntaId, nombreCategoria) => {
    setCheckboxes((prevState) => {
      const newState = { ...prevState, [preguntaId]: !prevState[preguntaId] };

      if (newState[preguntaId]) {
        setNiveles((prevNiveles) => ({
          ...prevNiveles,
          [nombreCategoria]: prevNiveles[nombreCategoria] + 1,
        }));
      } else {
        setNiveles((prevNiveles) => ({
          ...prevNiveles,
          [nombreCategoria]: prevNiveles[nombreCategoria] - 1,
        }));
      }

      return newState;
    });
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    // Capture the radar chart
    const chartElement = document.getElementById("radar-chart"); // Make sure this matches the ID of the chart container
    const canvas = await html2canvas(chartElement); // Render the chart into a canvas
    const imgData = canvas.toDataURL("image/png"); // Convert the canvas to an image

    // Add the chart image to the PDF
    doc.addImage(imgData, "PNG", 10, 10, 180, 120); // Adjust size and position as needed

    // Add questions responses
    let yOffset = 140;
    doc.setFontSize(12);
    doc.text("Preguntas Respondidas:", 10, yOffset);
    yOffset += 10;

    preguntasFiltradas.forEach((pregunta) => {
      doc.text(
        `${pregunta.texto}: ${checkboxes[pregunta.id_pregunta] ? "Sí" : "No"}`,
        10,
        yOffset
      );
      yOffset += 10;
    });

    // Add niveles
    doc.text("Niveles:", 10, yOffset);
    yOffset += 10;

    Object.keys(niveles).forEach((nivel) => {
      doc.text(`${nivel}: ${niveles[nivel]}`, 10, yOffset);
      yOffset += 10;
    });

    // Save the PDF
    doc.save("simulador_respuestas.pdf");
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Instrucciones</h2>

            <ul className="list-disc ml-5 mb-4">
              <li>Selecciona la característica KTH que desee evaluar</li>
              <li>
                Seleccione la casilla donde usted crea que su proyecto cumple de
                manera efectiva
              </li>
              <li>
                Observe el comportamiento de la gráfica y evalúe su proyecto
              </li>
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {!showModal && (
        <div className="text-white gap-8 mt-4 grid grid-cols-8">
          {/* Columna de botones a la izquierda (3/8) */}
          <div className="flex flex-col col-span-1 mr-3">
            <h2 className="mb-4 text-xl font-bold">Simulador</h2>
            <div className="flex flex-col space-y-4">
              {Object.keys(niveles).map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => aumentarNivel(nivel)}
                  className="p-2 border border-white hover:bg-blue-500"
                >
                  {nivel}
                </button>
              ))}
            </div>
          </div>

          {/* Columna de preguntas (2/8) */}
          <div className="col-span-4 mr-8">
            {nivelSeleccionado && (
              <>
                <h3 className="text-xl font-bold">
                  Preguntas para {nivelSeleccionado}:{" "}
                  <span className="text-lg font-normal">
                    NIVEL ACTUAL {niveles[nivelSeleccionado]}
                  </span>
                </h3>
                <ul style={{ fontSize: "20px" }}>
                  {preguntasFiltradas.map((pregunta) => (
                    <li key={pregunta.id_pregunta} className="mb-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={checkboxes[pregunta.id_pregunta] || false}
                          onChange={() =>
                            handleCheckboxChange(
                              pregunta.id_pregunta,
                              pregunta.nombre
                            )
                          }
                          className="mr-2 transform scale-150"
                        />
                        {pregunta.texto}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Columna de gráfico Radar (3/8) */}
          <div className="col-span-3 mr-8">
            <h3 className="text-xl font-bold">Gráfico Radar:</h3>
            <div id="radar-chart">
              <RadarChart niveles={niveles} />
            </div>
          </div>

          {/* Button to generate the PDF */}
          <button
            onClick={generatePDF}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mt-8"
          >
            Generar PDF
          </button>
        </div>
      )}
    </div>
  );
}
