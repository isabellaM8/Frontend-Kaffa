import { useState } from "react";

export default function ConfigBarista({ darkMode, setDarkMode, onLogout }) {
  const [nombre, setNombre] = useState("Isabella");
  const [correo, setCorreo] = useState("");
  const [foto, setFoto] = useState(null);

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
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Editar Perfil</h3>
      <div className="flex flex-col gap-4">
        {/* Foto de perfil */}
        <div className="flex items-center gap-4">
          {foto ? (
            <img src={foto} alt="Perfil" className="w-16 h-16 rounded-full border" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center">👤</div>
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

        {/* Campos */}
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

        {/* Selector de tema */}
        <select
          value={darkMode ? "oscuro" : "claro"}
          onChange={() => setDarkMode(!darkMode)}
          className={
            darkMode
              ? "border p-2 rounded bg-gray-700 text-white"
              : "border p-2 rounded bg-gray-100 text-black"
          }
        >
          <option value="claro">Claro</option>
          <option value="oscuro">Oscuro</option>
        </select>

        {/* Botones */}
        <button
          onClick={handleGuardar}
          className="bg-yellow-700 text-white px-4 py-2 rounded"
        >
          Guardar Cambios
        </button>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
