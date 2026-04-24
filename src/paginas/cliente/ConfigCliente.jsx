import { useState } from "react";

export default function ConfigCliente({ darkMode, setDarkMode }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombre, setNombre] = useState("Isabella");
  const [correo, setCorreo] = useState("");
  const [foto, setFoto] = useState(null);

  const handleThemeToggle = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "/login";
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGuardar = () => {
    alert("Cambios guardados correctamente");
    setMostrarModal(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Configuración</h2>

      {/* Botón o foto para abrir modal */}
      <div className="flex items-center gap-4">
        {foto ? (
          <img
            src={foto}
            alt="Perfil"
            className="w-16 h-16 rounded-full border cursor-pointer"
            onClick={() => setMostrarModal(true)}
          />
        ) : (
          <div
            className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
            onClick={() => setMostrarModal(true)}
          >
            👤
          </div>
        )}
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-yellow-900 text-white px-4 py-2 rounded"
        >
          Editar Perfil
        </button>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className={
              darkMode
                ? "bg-gray-800 rounded shadow-lg p-6 w-96 text-white"
                : "bg-white rounded shadow-lg p-6 w-96 text-black"
            }
          >
            <h3 className="text-xl font-semibold mb-4">Editar Perfil</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                {foto ? (
                  <img src={foto} alt="Perfil" className="w-16 h-16 rounded-full border" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">👤</div>
                )}
                <label
                  className={
                    darkMode
                      ? "bg-gray-700 px-4 py-2 rounded cursor-pointer text-white"
                      : "bg-gray-200 px-4 py-2 rounded cursor-pointer text-black"
                  }
                >
                  Cambiar Foto
                  <input type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
                </label>
              </div>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                className={
                  darkMode
                    ? "border p-2 rounded bg-gray-700 text-white"
                    : "border p-2 rounded bg-gray-100 text-black"
                }
              />
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Correo"
                className={
                  darkMode
                    ? "border p-2 rounded bg-gray-700 text-white"
                    : "border p-2 rounded bg-gray-100 text-black"
                }
              />
              <select
                value={darkMode ? "oscuro" : "claro"}
                onChange={handleThemeToggle}
                className={
                  darkMode
                    ? "border p-2 rounded bg-gray-700 text-white"
                    : "border p-2 rounded bg-gray-100 text-black"
                }
              >
                <option value="claro">Claro</option>
                <option value="oscuro">Oscuro</option>
              </select>
              <button
                onClick={handleGuardar}
                className="bg-yellow-900 text-white px-4 py-2 rounded"
              >
                Guardar Cambios
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Cerrar Sesión
              </button>
              <button
                onClick={() => setMostrarModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
