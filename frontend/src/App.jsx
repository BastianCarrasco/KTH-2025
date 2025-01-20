import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Proyectos from "./Components/Proyectos";
import Docentes from "./Components/Docentes";
import Niveles from "./Components/KTH/Niveles";
import Formualrio2 from "./Components/Formualrio2";
import Simulador from "./Components/Simulador";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div
        className="flex flex-col min-h-screen bg-gradient-to-b from-black to-gray-800" // Degradado de negro a gris
      >
        <div className="flex-grow p-4">
          {/* This allows the content to grow and take up available space */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/datos" element={<Proyectos />} />
            <Route path="/docentes" element={<Docentes />} />
            <Route path="/niveles" element={<Niveles />} />
            <Route path="/simulador" element={<Simulador />} />
            <Route path="/formulario2" element={<Formualrio2 />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-slateCustom p-4 text-white w-full flex justify-center items-center mt-auto">
          <div className="flex space-x-4">
            <p>&copy; 2025 Mi App. Todos los derechos reservados.</p>
            <span>|</span>
            <a href="/privacy" className="text-white hover:text-gray-300">
              Política de privacidad
            </a>
            <span>|</span>
            <a href="/terms" className="text-white hover:text-gray-300">
              Términos y condiciones
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
