import { useEffect, useState } from "react";

const perfilInicial = {
  nombre: "Isabella",
  correo: "cliente@kaffa.com",
  foto: null,
};

export default function ConfigCliente({ darkMode, setDarkMode, onLogout }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    const perfilGuardado = JSON.parse(localStorage.getItem("clientePerfil")) || perfilInicial;
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
    localStorage.setItem("clientePerfil", JSON.stringify({ nombre, correo, foto }));
    alert("Perfil guardado correctamente");
  };

  const handleThemeChange = (e) => {
    setDarkMode(e.target.value === "oscuro");
  };

  return (
    <div className={darkMode ? "bg-gray-900 p-6 rounded-xl shadow text-white" : "bg-white p-6 rounded-xl shadow text-gray-900"}>
      <h2 className="text-2xl font-bold mb-4">Configuración</h2>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="space-y-4">
          {foto ? (
            <img src={foto} alt="Perfil" className="h-40 w-40 rounded-full object-cover" />
          ) : (
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gray-700 text-4xl">👤</div>
          )}
          <label className={darkMode ? "block rounded bg-gray-800 px-4 py-2 text-center text-white" : "block rounded bg-gray-100 px-4 py-2 text-center text-gray-900"}>
            Cambiar Foto
            <input type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={darkMode ? "mt-2 w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white" : "mt-2 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-900"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className={darkMode ? "mt-2 w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white" : "mt-2 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-900"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Tema</label>
            <select
              value={darkMode ? "oscuro" : "claro"}
              onChange={handleThemeChange}
              className={darkMode ? "mt-2 w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white" : "mt-2 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-900"}
            >
              <option value="claro">Claro</option>
              <option value="oscuro">Oscuro</option>
            </select>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button onClick={handleGuardar} className="rounded-xl bg-yellow-700 px-4 py-3 text-white hover:bg-yellow-600">Guardar Cambios</button>
            <button onClick={onLogout} className="rounded-xl bg-red-600 px-4 py-3 text-white hover:bg-red-500">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
}
