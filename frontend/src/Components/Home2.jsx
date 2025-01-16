import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de tener React Router instalado para usar Link

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="container mx-auto p-6 text-left">
        <h1 className="text-4xl font-bold mb-6">
          Bienvenido al KTH Innovation Readiness Level Dashboard
        </h1>
        <p className="text-lg mb-1">
          Esta herramienta te ayudará a evaluar el estado de desarrollo de
          proyectos de innovación y nuevas empresas, y a planificar los próximos
          pasos adecuados para tu proyecto.
        </p>

        <section className="bg-transparent p-8 rounded-lg shadow-none text-black-900 mb-8">
          <h2 className="text-3xl font-semibold mb-4">Propósito</h2>
          <p className="text-lg">
            El KTH Innovation Readiness Level Dashboard facilita el uso del
            modelo KTH Innovation Readiness Level para evaluar el estado de
            desarrollo y planificar los próximos pasos en proyectos de
            innovación y nuevas empresas.
          </p>
        </section>

        <section className="bg-transparent p-8 rounded-lg shadow-none text-black-900 mb-8">
          <h2 className="text-3xl font-semibold mb-4">Casos de uso típicos</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>
              Evaluar el estado de desarrollo de un proyecto y hacer seguimiento
              del progreso a lo largo del tiempo.
            </li>
            <li>
              Comparar y hacer seguimiento del estado de desarrollo de una
              cartera de proyectos.
            </li>
          </ul>
        </section>

        <section className="bg-transparent p-8 rounded-lg shadow-none text-black-900 mb-8">
          <h2 className="text-3xl font-semibold mb-4">
            Cómo utilizar la herramienta
          </h2>
          <p className="text-lg mb-4">
            Existen diferentes maneras de utilizar esta herramienta, algunas de
            las cuales son:
          </p>
          <ul className="list-decimal pl-6 text-lg">
            <li>
              Para seguir un proyecto individual más detalladamente, use la
              pestaña "Proyecto individual". Ahí podrá revisar todos los
              criterios y marcar los alcanzados, para evaluar el Nivel de
              Madurez de Innovación.
            </li>
            <li>
              Para hacer seguimiento de una cartera de proyectos, use la pestaña
              "Carpeta de proyectos", donde podrá ingresar las evaluaciones del
              Nivel de Madurez de Innovación actual para cada proyecto.
            </li>
            <li>Cualquier combinación de ambos enfoques anteriores.</li>
          </ul>
        </section>

        <div className="mt-6">
          <Link
            to="/formulario2" // Cambia esta dirección al path correcto para el formulario
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
          >
            Ir al formulario
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
