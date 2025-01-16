import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de tener instalado react-router-dom
import kth_logo from "../assets/kth-logo.png";
import pucv_logo from "../assets/PUCV.png"; // Corregí el nombre del logo

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6">
      {/* Sección de introducción */}
      <div className="w-full max-w-4xl  text-white p-6 rounded-lg shadow-md">
        <h1
          className="text-2xl font-bold mb-4 text-center"
          style={{ fontSize: "25px" }}
        >
          Bienvenido al KTH Innovation Readiness Level Dashboard
        </h1>
        <p className="mb-4 text-lg text-center">
          Esta herramienta te ayudará a evaluar el estado de desarrollo de
          proyectos de innovación y nuevas empresas, y a planificar los próximos
          pasos adecuados para tu proyecto.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-center">Propósito</h2>
        <p className="text-lg mb-4 text-center">
          El KTH Innovation Readiness Level Dashboard facilita el uso del modelo
          KTH Innovation Readiness Level para evaluar el estado de desarrollo y
          planificar los próximos pasos en proyectos de innovación y nuevas
          empresas.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-center">
          Casos de uso típicos
        </h2>
        <ul className="list-disc pl-6 text-lg mb-4 text-center">
          <li>
            Evaluar el estado de desarrollo de un proyecto y hacer seguimiento
            del progreso a lo largo del tiempo.
          </li>
          <li>
            Comparar y hacer seguimiento del estado de desarrollo de una cartera
            de proyectos.
          </li>
        </ul>
      </div>

      {/* Sección de cómo utilizar la herramienta */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Cómo utilizar la herramienta
        </h2>
        <p className="text-lg mb-4 text-center">
          Existen diferentes maneras de utilizar esta herramienta, algunas de
          las cuales son:
        </p>
        <ul className="list-decimal pl-6 text-lg mb-4 text-center">
          <li>
            Para seguir un proyecto individual más detalladamente, use la
            pestaña "Proyecto individual". Ahí podrá revisar todos los criterios
            y marcar los alcanzados, para evaluar el Nivel de Madurez de
            Innovación.
          </li>
          <li>
            Para hacer seguimiento de una cartera de proyectos, use la pestaña
            "Carpeta de proyectos", donde podrá ingresar las evaluaciones del
            Nivel de Madurez de Innovación actual para cada proyecto.
          </li>
          <li>Cualquier combinación de ambos enfoques anteriores.</li>
        </ul>

        {/* Contenedor para centrar el botón en la columna */}
        <div className="flex justify-center mt-6">
          <Link
            to="/formulario2" // Cambia esta dirección al path correcto para el formulario
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 text-xl rounded-lg shadow-md transition duration-300"
          >
            Ir al formulario
          </Link>
        </div>
      </div>

      {/* Contenedor de las imágenes */}
      <div className="flex justify-center space-x-4 mt-6">
        {/* Imagen de KTH */}
        <img
          className="w-1/3 object-contain"
          src={kth_logo}
          alt="Logo de KTH"
        />
        {/* Imagen de PUCV */}
        <img
          className="w-1/3 object-contain"
          src={pucv_logo}
          alt="Logo de PUCV"
        />
      </div>
    </div>
  );
};

export default Home;
