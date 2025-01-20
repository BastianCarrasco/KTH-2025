import React, { useState } from "react";

const ProjectFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState({
    titulo: "",
    investigador: "",
    colaboradores: "",
    invenciones: "",
    financiamiento: "",
    industria: "",
    empresa: "",
    email: "", // Nuevo campo para el email
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(project);
    setIsOpen(false); // Cierra el modal al enviar el formulario
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Crear Proyecto
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div
            style={{ border: "solid" }}
            className="bg-gradient-to-r from-blue-900 to-black p-6 rounded-lg shadow-lg max-w-4xl w-full"
          >
            <h2 className="text-2xl font-bold mb-4">Nuevo Proyecto</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label className="block text-white-700">Título</label>
                  <input
                    style={{ color: "black" }}
                    type="text"
                    name="titulo"
                    value={project.titulo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white-700">Investigador</label>
                  <input
                    style={{ color: "black" }}
                    type="text"
                    name="investigador"
                    value={project.investigador}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white-700">Colaboradores</label>
                  <input
                    style={{ color: "black" }}
                    type="text"
                    name="colaboradores"
                    value={project.colaboradores}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white-700">Invención</label>
                  <input
                    style={{ color: "black" }}
                    type="text"
                    name="invenciones"
                    value={project.invenciones}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white-700">Financiamiento</label>
                  <input
                    style={{ color: "black" }}
                    type="text"
                    name="financiamiento"
                    value={project.financiamiento}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white-700">Industria</label>
                  <input
                    style={{ color: "black" }}
                    type="text"
                    name="industria"
                    value={project.industria}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white-700">Empresa</label>
                  <input
                    style={{ color: "black" }}
                    type="text"
                    name="empresa"
                    value={project.empresa}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white-700">Email</label>
                  <input
                    style={{ color: "black" }}
                    type="email"
                    name="email"
                    value={project.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFormModal;
