import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [showModal, setShowModal] = useState(false); // Modal visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    // Hardcoded check for username and password (you can replace this with real authentication)
    if (username === "usuario" && password === "clave123") {
      setIsAuthenticated(true);
      setShowModal(false);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <nav className="bg-slateCustom p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-lg font-bold">Mi App</div>
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
          <Link to="/docentes" className="text-white hover:text-gray-300">
            Docentes
          </Link>
          <Link to="/niveles" className="text-white hover:text-gray-300">
            Niveles
          </Link>
          <Link to="/formulario" className="text-white hover:text-gray-300">
            Formulario
          </Link>
          {isAuthenticated ? (
            <Link to="/datos" className="text-white hover:text-gray-300">
              Proyectos
            </Link>
          ) : (
            <button
              onClick={() => setShowModal(true)}
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
          onClick={() => setShowModal(true)}
          className="block text-white hover:text-gray-300"
        >
          Datos
        </button>
      </div>

      {/* Authentication Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Ingresar</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Ingresar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
