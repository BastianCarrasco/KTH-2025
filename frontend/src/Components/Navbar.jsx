import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    // Simulación de autenticación simple
    setIsAuthenticated(true);
  };

  return (
    <>
      <nav
        style={{ marginBottom: "-10px", marginTop: "-10px" }}
        className="bg-slateCustom p-4"
      >
        <div className="flex justify-between items-center">
          <div className="text-white text-lg font-bold">KTH</div>
          <button
            className="text-white md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/simulador" className="text-white hover:text-gray-300">
              Simulador
            </Link>
            <Link to="/docentes" className="text-white hover:text-gray-300">
              Docentes
            </Link>
            <Link to="/niveles" className="text-white hover:text-gray-300">
              Niveles
            </Link>

            <Link to="/formulario2" className="text-white hover:text-gray-300">
              Formulario
            </Link>
            {isAuthenticated ? (
              <Link to="/datos" className="text-white hover:text-gray-300">
                Proyectos
              </Link>
            ) : (
              <button
                onClick={handleLogin}
                className="text-white hover:text-gray-300"
              >
                Proyectos
              </button>
            )}
          </div>
        </div>
        <div
          className={`${isOpen ? "block" : "hidden"} md:hidden mt-2 space-y-2`}
        >
          <Link
            to="/"
            className="block text-white hover:text-gray-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <button
            onClick={handleLogin}
            className="block text-white hover:text-gray-300"
          >
            Datos
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
