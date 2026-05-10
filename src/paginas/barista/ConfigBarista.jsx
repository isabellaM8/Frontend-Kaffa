import { useEffect, useState } from "react";

const perfilInicial = {
  nombre: "Isabella",
  correo: "barista@kaffa.com",
  foto: null,
};

export default function ConfigBarista({ darkMode, setDarkMode, onLogout }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    const perfilGuardado = JSON.parse(localStorage.getItem("baristaPerfil")) || perfilInicial;
    setNombre(perfilGuardado.nombre);
    setCorreo(perfilGuardado.correo);
    setFoto(perfilGuardado.foto);
  }, []);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGuardar = () => {
    localStorage.setItem(
      "baristaPerfil",
      JSON.stringify({ nombre, correo, foto })
    );
    alert("Perfil guardado correctamente");
  };

  const handleTema = (e) => {
    setDarkMode(e.target.value === "oscuro");
  };

  return (
    <div className={darkMode ? "bg-gray-900 p-6 rounded-xl shadow" : "bg-white p-6 rounded-xl shadow"}>
      <h2 className="text-2xl font-bold mb-4">Configuración de Perfil</h2>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-4">
          {foto ? (
            <img src={foto} alt="Perfil" className="w-40 h-40 rounded-full object-cover" />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-400 flex items-center justify-center text-4xl">👤</div>
          )}
          <label className={darkMode ? "bg-gray-800 px-4 py-2 rounded cursor-pointer text-white" : "bg-gray-200 px-4 py-2 rounded cursor-pointer text-black"}>
            Cambiar Foto
            <input type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
          </label>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            className={
              darkMode
                ? "w-full border border-gray-700 bg-gray-800 text-white rounded px-4 py-2"
                : "w-full border border-gray-300 bg-white text-black rounded px-4 py-2"
            }
          />
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo"
            className={
              darkMode
                ? "w-full border border-gray-700 bg-gray-800 text-white rounded px-4 py-2"
                : "w-full border border-gray-300 bg-white text-black rounded px-4 py-2"
            }
          />

          <label className="block text-sm font-medium text-gray-500">Tema</label>
          <select
            value={darkMode ? "oscuro" : "claro"}
            onChange={handleTema}
            className={
              darkMode
                ? "w-full border border-gray-700 bg-gray-800 text-white rounded px-4 py-2"
                : "w-full border border-gray-300 bg-white text-black rounded px-4 py-2"
            }
          >
            <option value="claro">Claro</option>
            <option value="oscuro">Oscuro</option>
          </select>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button onClick={handleGuardar} className="bg-yellow-700 text-white px-5 py-3 rounded hover:bg-yellow-600">
              Guardar Cambios
            </button>
            <button onClick={onLogout} className="bg-red-600 text-white px-5 py-3 rounded hover:bg-red-500">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
