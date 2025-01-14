import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Proyectos from "./Components/Proyectos";
import Docentes from "./Components/Docentes";
import Niveles from "./Components/KTH/Niveles";
import Formulario from "./Components/Formulario";
const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/datos" element={<Proyectos />} />
          <Route path="/docentes" element={<Docentes />} />
          <Route path="/niveles" element={<Niveles />} />
          <Route path="/formulario" element={<Formulario />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
